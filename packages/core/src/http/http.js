import axios from 'axios';
import qs from 'query-string'

import { GlobalSetting } from '../global-setting';

const converNewErrorCodeModuleSystem = (response) => {
    if (response && response.data &&
        response.data.operationResult &&
        response.data.operationResult.ResultCode <= 999999) {
        const code = response.data.operationResult.ResultCode

        // deprecated
        if (code <= 999999) {
            return
        }

        // skip 790000-799999 ?
        if (code >= 790000 && code <= 799999) {
            return
        }

        // eslint-disable-next-line no-param-reassign
        response.data.operationResult.ResultCode = 100000000000000 + response.data.operationResult.ResultCode
    }
}

/**
 * HTTP API base class, all method return axios response,see {@link DataAPI} for SON data response.
 * @class
 */
class BaseAPI {
    /**
     * @hideconstructor
     */
    constructor() {
        this.$axios = axios.create({
            baseURL: GlobalSetting.getEndpoint(),
            timeout: 0,
            headers: { 'Access-Control-Allow-Origin': "*" }
        })
        this.$axios.interceptors.response.use((response) => {
            converNewErrorCodeModuleSystem(response)

            if (response.status === 200 && response.data.operationResult && response.data.operationResult.ResultCode !== 0) {
                return Promise.reject({
                    config: response.config,
                    message: response.data.operationResult.ResultDesc,
                    request: response.request,
                    response
                })
            }

            return response;
        }, (error) => {
            if (error && error.response) {
                converNewErrorCodeModuleSystem(error.response)
            }

            return Promise.reject(error);
        });
        this.httpType = 'default' // default|form|multipart
        this.defaults = { headers: {} }
        this.formdefaults = {
            // https://stackoverflow.com/questions/5258977/are-http-headers-case-sensitive
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            transformRequest: [(data) => qs.stringify(data)]
        }
        this.multipartFormDefaults = {
            // https://segmentfault.com/a/1190000016927601
            headers: { 'Content-Type': 'multipart/form-data;;charset=utf-8' },
            transformRequest: [(data) => data]
        }
        this.getEndpoint = GlobalSetting.getEndpoint
        this.getToken = GlobalSetting.getToken

        this.getTenantGuid = GlobalSetting.getTenantGuid
        this.getDomainGuid = GlobalSetting.getDomainGuid
    }

    /**
     * @description send the get request
     * @param {Object} [config] - The config of request.
     */
    request(config) {
        return this.$axios.request(this._ensureConfig(config))
    }

    /**
     * @description send the get request
     * @param {string} url - The url of request.
     * @param {Object} [config] - The config of request.
     */
    get(url, config) {
        return this.$axios.get(url, this._ensureConfig(config))
    }

    /**
     * @description send the delete request
     * @param {string} url - The url of request.
     * @param {Object} [config] - The config of request.
     */
    delete(url, config) {
        return this.$axios.delete(url, this._ensureConfig(config))
    }

    /**
     * @description send the head request
     * @param {string} url - The url of request.
     * @param {Object} [config] - The config of request.
     */
    head(url, config) {
        return this.$axios.head(url, this._ensureConfig(config))
    }

    /**
     * @description send the options request
     * @param {string} url - The url of request.
     * @param {Object} [config] - The config of request.
     */
    options(url, config) {
        return this.$axios.options(url, this._ensureConfig(config))
    }

    /**
     * @description send the post request
     * @param {string} url - The url of request.
     * @param {Object} [data] - The data of request.
     * @param {Object} [config] - The config of request.
     */
    post(url, data, config) {
        return this.$axios.post(url, data, this._ensureConfig(config))
    }

    /**
     * @description send the put request
     * @param {string} url - The url of request.
     * @param {Object} [data] - The data of request.
     * @param {Object} [config] - The config of request.
     */
    put(url, data, config) {
        return this.$axios.put(url, data, this._ensureConfig(config))
    }


    /**
     * @description send the patch request
     * @param {string} url - The url of request.
     * @param {Object} [data] - The data of request.
     * @param {Object} [config] - The config of request.
     * @returns {AxiosResponse}
     */
    patch(url, data, config) {
        return this.$axios.patch(url, data, this._ensureConfig(config))
    }

    _ensureConfig(config) {
        this.$axios.defaults.baseURL = this.getEndpoint()
        const token = this.getToken()

        if (token) {
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }

        let fullConfig = {
            ...{},
            ...config,
            ...this.defaults
        }

        // default|form|multipart
        switch (this.httpType) {
            case 'form':
                fullConfig = { ...fullConfig, ...this.formdefaults }

                break;
            case 'multipart':
                fullConfig = { ...fullConfig, ...this.multipartFormDefaults }

                break;
            default:
                break
        }

        fullConfig.headers['TenantGuid'] = this.getTenantGuid()
        fullConfig.headers['DomainGuid'] = this.getDomainGuid()

        return fullConfig
    }

    /**
     * @typedef Interceptor
     * @property {AxiosInterceptorManager<AxiosRequestConfig>} request - The request
     * @property {AxiosInterceptorManager<AxiosResponse>} response - The response
     */

    /**
     * Get interceptors for current axios instance.
     * @returns {Interceptor} The interceptors of the axios     *
     */
    useInterceptors() {
        return this.$axios.interceptors
    }
}

/**
 * Creates a new DomainAPI instance, see base class {@link BaseAPI} for more methods.
 * @class
 */
class IsolatedAPI extends BaseAPI {
    /**
     * Initinal Domain Level API.
     * @param {GUID} tenantGuid - The tenant guid value.
     * @param {GUID} domainGuid - The domain guid value.
     */
    constructor(tenantGuid, domainGuid) {
        super()
        this.switchDomain(tenantGuid, domainGuid)
    }

    /**
     * Change tenantGuid and domainGuid contect for current API instance.
     * @param {GUID} tenantGuid - The tenant guid value or function with tenant value returned.
     * @param {GUID} domainGuid - The domain guid value or function with tenant value returned.
     */
    switchDomain(tenantGuid, domainGuid) {
        this.getTenantGuid = typeof tenantGuid === "function" ? tenantGuid : () => tenantGuid
        this.getDomainGuid = typeof domainGuid === "function" ? domainGuid : () => domainGuid
    }
}

/**
 * Global variable for axios instance, see base class {@link BaseAPI} for more methods.
 * @class
 */
class GlobalAPI extends BaseAPI {
    /**
     * Initinal an isolated domain api instance without global interceptors.
     * @param {GUID} tenantGuid - The tenant guid value.
     * @param {GUID} domainGuid - The domain guid value.
     * @returns {IsolatedAPI}
     * @example
     * var domainAPI = GlobalAPI.createDomainAPI('xxxx-xxxx-xxxxxxxx-xxxx-xxxx','xxxx-xxxx-xxxxxxxx-xxxx-xxxx');
     * domainAPI.get(url).then()
     */
    createIsolatedInstance(tenantGuid, domainGuid) {
        return new IsolatedAPI(tenantGuid, domainGuid)
    }
}

/**
 * Global GlobalAPI instance, see {@link GlobalAPI} for more methods.
 * @namespace
 */
const Http = new GlobalAPI()

export { Http }
