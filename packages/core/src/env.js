/* eslint-disable unicorn/prefer-includes */
/* eslint-disable no-implicit-coercion */

/**
 * Universal global scope object. In the browser this is `self`, in Node.js and React Native it's `global`.
 * This file is excluded from coverage reporting because these globals are environment-specific so we can't test them all.
 */
const GlobalScope = (() => {
    if (typeof self === "object" && self.self === self) {
        return self
    }

    if (typeof global === "object" && global.global === global) {
        return global
    }

    return {} // fallback that relies on imported modules to be singletons
})()

/**
 * @memberOf Env
 */
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * @memberOf Env
 */
const isWebWorker =
    typeof self === 'object' &&
    self.constructor &&
    self.constructor.name === 'DedicatedWorkerGlobalScope';

/**
 * @memberOf Env
 */
const isNode =
    typeof process !== 'undefined' &&
    process.versions !== null &&
    process.versions.node !== null;

/*
 * Browser Detection
 * https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 */

/**
 * Opera 8.0+
 * @memberOf Browser
 */
// eslint-disable-next-line no-undef
const isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

/**
 * Firefox 1.0+
 * @memberOf Browser
 */
const isFirefox = typeof InstallTrigger !== 'undefined';

/**
 * Safari 3.0+ "[object HTMLElementConstructor]"
 * @memberOf Browser
 */
// eslint-disable-next-line no-undef
const isSafari = /constructor/i.test(window.HTMLElement) || ((p) => p.toString() === "[object SafariRemoteNotification]")(!window['safari'] || typeof safari !== 'undefined' && safari.pushNotification);

/**
 * Internet Explorer 6-11
 * @memberOf Browser
 */
// eslint-disable-next-line spaced-comment
const isIE = /*@cc_on!@*/ false || !!document.documentMode;

/**
 * Edge 20+
 * @memberOf Browser
 */
const isEdge = !isIE && !!window.StyleMedia;

/**
 * Chrome 1 - 71
 * @memberOf Browser
 */
const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

/**
 * Edge (based on chromium) detection
 * @memberOf Browser
 */
const isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") !== -1;

/**
 * Blink engine detection
 * @memberOf Browser
 */
const isBlink = (isChrome || isOpera) && !!window.CSS;

/**
 * Global Env functions
 * @namespace Env
 *
 */
const Env = { isBrowser, isNode, isWebWorker }

/**
 * Global Browser detection
 * @namespace Browser
 *
 */
const Browser = { isOpera, isFirefox, isSafari, isIE, isEdge, isChrome, isEdgeChromium, isBlink }

export { GlobalScope, Env, Browser }
