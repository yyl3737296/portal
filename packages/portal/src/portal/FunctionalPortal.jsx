import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import ReactGridLayout2, {WidthProvider} from 'react-grid-layout';
import {HTMLRender} from '@netbrain/component';
import selector from '../component';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(ReactGridLayout2);

const PortalFunction = (props) => {
    const {match} = props;
    const {portalId} = match.params;
    const [portalData, setPortalData] = useState({header: '', footer: '', components: []});

    const generateDOM = () => {
        return portalData.components.map((c, index) => {
            let [x, y, w, h] = c.grid;
            let Component = selector(c.component);
            // console.log(Component);
            return (
                <div key={index} data-grid={{x, y, w, h}}>
                    <Component {...c.data} />
                </div>
            );
        });
    };

    useEffect(() => {
        var data = {
            portalGuid: 'xxxxxxxxxxxxxxx',
            title: 'portal title',
            header: '<div>Here is the <label style="color:red">header</label></div>',
            footer: '<div>Here is the <label style="color:red;font-weight: bold;">footer</label></div>',
            components: [
                {grid: [0, 0, 12, 10], component: 'map', data: {mapId: 'xxxx-xxxxxxxx-xxxxxxxx-xxxx'}},
                {
                    grid: [10, 0, 12, 1],
                    component: 'CreatedBy',
                    data: {createUser: 'Tao.Xu', createDate: new Date()}
                }
            ],
            createUser: 'Tao.Xu',
            createDate: new Date()
        };
        setTimeout(() => {
            setPortalData(data);
            document.title = data.title;
        }, 0);
    }, [setPortalData]);

    const defaultProps = {
        className: 'layout',
        isDraggable: false,
        isResizable: false,
        cols: 12,
        rowHeight: 30,
        margin: [10, 10],
        containerPadding: [10, 10]
    };

    return (
        <>
            <header>
                <HTMLRender html={portalData.header || ''}></HTMLRender>
            </header>
            <h2>Function Portal:{portalId}</h2>
            <ReactGridLayout className="layout" {...defaultProps}>
                {generateDOM()}
            </ReactGridLayout>
            <footer>
                <HTMLRender html={portalData.footer || ''}></HTMLRender>
            </footer>
        </>
    );
};

export default withRouter(PortalFunction);
