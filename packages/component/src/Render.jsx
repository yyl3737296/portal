import React from 'react';
import parse from 'html-react-parser';
import {Utils} from '@netbrain/core';

const blackElements = ['script', 'form', 'canvans', 'svg'];
const potentialXSSAttributes = ['href', 'action', 'formaction', 'background', 'src', 'dynsrc', 'lowsrc'];

const isOnEventAttribute = (key) => {
    if (key) {
        return key.startsWith('on');
    }

    return true;
};

const hasXSSAttributeValue = (value) => {
    if (value) {
        return value
            .toLowerCase()
            .trim()
            .startsWith('javascript');
    }

    return true;
};

export const IFrameRender = (props) => {
    const {title, ...rest} = props;

    // eslint-disable-next-line no-unused-vars
    for (const attr in rest) {
        if (isOnEventAttribute(attr)) {
            delete rest[attr];
        } else if (potentialXSSAttributes.includes(attr) && hasXSSAttributeValue(rest[attr])) {
            delete rest[attr];
        }
    }

    return <iframe title={title} {...rest} />;
};

export const HTMLRender = (props) => {
    const {html, ...placeholders} = props;
    const marks = Object.keys(placeholders);

    let _html = html;

    // https://github.com/leizongmin/js-xss
    if (window.filterXSS && Utils.isFunc(window.filterXSS)) {
        _html = window.filterXSS(_html, {
            stripIgnoreTagBody: true,
            onIgnoreTag: (tag, html1) => {
                if (tag.substr(0, 2) === 'x-' || !blackElements.includes(tag)) {
                    return html1;
                }
            },
            onIgnoreTagAttr: (tag, name, value) => {
                if (name.substr(0, 5) === 'data-' || marks.concat(['id', 'class', 'style']).includes(name)) {
                    return `${name}="${window.filterXSS.escapeAttrValue(value)}"`;
                }
            }
        });
    }

    return parse(_html, {
        replace: (domNode) => {
            const {name, attribs} = domNode;

            if (blackElements.includes(name)) {
                return <></>;
            }

            if (!attribs) {
                return;
            }

            const idValueToLower = (attribs.id || '').toLowerCase();

            if (marks.includes(idValueToLower)) {
                return placeholders[idValueToLower];
            }

            // eslint-disable-next-line no-unused-vars
            for (const attr in attribs) {
                if (isOnEventAttribute(attr)) {
                    delete attribs[attr];
                } else if (marks.includes(attr)) {
                    return placeholders[attr];
                } else if (marks.includes(attr.replace(/^data-/, ''))) {
                    return placeholders[attr.replace(/^data-/, '')];
                } else if (potentialXSSAttributes.includes(attr) && hasXSSAttributeValue(attribs[attr])) {
                    delete attribs[attr];
                }
            }
        }
    });
};
