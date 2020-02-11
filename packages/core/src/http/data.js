import { Http } from './http';

const responseConvert = (response) => {
    if (response.operationResult) {
        return response.data
    }

    if (response.status && response.config && response.request) {
        if (response.operationResult) {
            return response.data.data
        }

        return response.data
    }

    return response
}

/**
 * DATA API base class, all method return JSON data, see {@link DataAPI} for axios response.
 * @class
 */
class DataAPI {
    constructor(http) {
        this.$http = http
    }

    /**
     * @description send the get request
     * @param {Object} [config] - The config of request.
     * @returns {JSON}
     */
    request(config) {
        return this.$http.request(config).then((response) => response.data)
    }

    /**
     * @description send the get request
     * @param {string} url - The url of request.
     * @param {Object} [config] - The config of request.
     * @returns {JSON}
     */
    get(url, config) {
        return this.$http.get(url, config).then((response) => response.data)
    }

    /**
     * @description send the delete request
     * @param {string} url - The url of request.
     * @param {Object} [config] - The config of request.
     * @returns {JSON}
     */
    delete(url, config) {
        return this.$http.delete(url, config).then((response) => responseConvert(response))
    }

    /**
     * @description send the head request
     * @param {string} url - The url of request.
     * @param {Object} [config] - The config of request.
     * @returns {JSON}
     */
    head(url, config) {
        return this.$http.head(url, config).then((response) => response.data)
    }

    /**
     * @description send the options request
     * @param {string} url - The url of request.
     * @param {Object} [config] - The config of request.
     * @returns {JSON}
     */
    options(url, config) {
        return this.$http.options(url, config).then((response) => response.data)
    }

    /**
     * @description send the post request
     * @param {string} url - The url of request.
     * @param {Object} [data] - The data of request.
     * @param {Object} [config] - The config of request.
     * @returns {JSON}
     */
    post(url, data, config) {
        return this.$http.post(url, data, config).then((response) => response.data)
    }

    /**
     * @description send the put request
     * @param {string} url - The url of request.
     * @param {Object} [data] - The data of request.
     * @param {Object} [config] - The config of request.
     * @returns {JSON}
     */
    put(url, data, config) {
        return this.$http.put(url, data, config).then((response) => response.data)
    }


    /**
     * @description send the patch request
     * @param {string} url - The url of request.
     * @param {Object} [data] - The data of request.
     * @param {Object} [config] - The config of request.
     * @returns {JSON}
     */
    patch(url, data, config) {
        return this.$http.patch(url, data, config).then((response) => response.data)
    }

    /**
     * Initinal an isolated domain api instance without global interceptors.
     * @param {GUID} tenantGuid - The tenant guid value.
     * @param {GUID} domainGuid - The domain guid value.
     * @returns {DataAPI}
     * @example
     * var domainAPI = GlobalAPI.createDomainAPI('xxxx-xxxx-xxxxxxxx-xxxx-xxxx','xxxx-xxxx-xxxxxxxx-xxxx-xxxx');
     * domainAPI.get(url).then()
     */
    createIsolatedInstance(tenantGuid, domainGuid) {
        return new DataAPI(Http.createIsolatedInstance()(tenantGuid, domainGuid))
    }
}

/**
 * Global DataAPI instance, see {@link DataAPI} for more methods.
 * @namespace
 */
const Data = new DataAPI(Http)

export { Data }
