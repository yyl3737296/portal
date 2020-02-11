import { formatUrl, trimUrlSlash, getValidUrl, parseJwtPayload } from './http/utils'

const Utils = {
    /**
     * @example
     * // returns true
     * Utils.isFunc(function(){});
     * @param {Object} object - The param to check.
     */
    isFunc: (o) => typeof o === 'function',

    /**
     * @example
     * // returns true
     * Utils.isObject({a:1});
     * @param {Object} object - The param to check.
     */
    isObject: (o) => Object.prototype.toString.call(o) === '[object Object]',

    /**
     * Fill a url with URL pattern and pathParams/queryParams.
     * @param {string} url - Url pattern.
     * @param {Object} pathParams - Params in path.
     * @param {Object} queryParams - Params in query.
     * @example
     * // /maps/xxx/yyy?userid=123
     * fillUrl("/maps/:tenantguid/:domainguid", {tenantguid:"xxx", domainguid:"yyy"}, {userid: 123})
     *
     * // /status/xxx/yyy
     * fillUrl("/status/:tenantguid/:domainguid", {tenantguid:"xxx", domainguid:"yyy"})
     *
     * // /users?active=true
     * fillUrl("/users", {active: true})
     */
    formatUrl: (url, pathParams, queryParams) => formatUrl(url, pathParams, queryParams),

    /**
     * @param {string} url
     */
    trimUrlSlash: (url) => trimUrlSlash(url),

    /**
     * @param {string} url
     */
    getValidUrl: (url) => getValidUrl(url),

    /**
     * @param {string} token
     */
    parseJwtPayload: (token) => parseJwtPayload(token)
};

/**
 * Global Util functions
 * @namespace Utils
 *
 */
export { Utils }
