const DEFAULT_SETTING = {
    clientAppId: undefined,
    endpoint: "http://localhost/ServicesAPI/",
    getToken: () => {
        throw new Error('You need to provide the getToken function implementation for the global setting options! return null for anonymous.')
    },
    getTenantGuid: () => {
        throw new Error('You need to provide the getTenantGuid function implementation for the global setting options!')
    },
    getDomainGuid: () => {
        throw new Error('You need to provide the getDomainGuid function implementation for the global setting options!')
    }
}

/**
 * Global setting instance.
 * @namespace
 */
const GlobalSetting = new class GlobalSetting {
    /**
     * @hideconstructor
     */
    constructor() {
        this.innerOptions = DEFAULT_SETTING
    }

    /**
     * @function
     * @param {Object} options - The global setting data.
     * @memberof GlobalSetting
     * @instance
     * @example <caption>Example usage of GlobalSetting init.</caption>
     * GlobalSetting.init({
     *   endpoint: "http://localhost/ServicesAPI/",
     *   getToken: () => {
     *      throw new Error('You need to provide the getToken function implementation for the global setting options!')
     *   },
     *   getTenantGuid: () => {
     *     throw new Error('You need to provide the getTenantGuid function implementation for the global setting options!')
     *   },
     *   getDomainGuid: () => {
     *     throw new Error('You need to provide the getDomainGuid function implementation for the global setting options!')
     *   }
     *  });
     */
    init(options) {
        this.innerOptions = {
            ...this.innerOptions,
            ...options
        }
    }

    /**
     * Get the current client app Id
     * @function
     * @returns {string}
     * @memberof GlobalSetting
     * @instance
     */
    getClientAppId = () => this.innerOptions.clientAppId

    /**
     * Get the API endpoint
     * @function
     * @returns {string}
     * @memberof GlobalSetting
     * @instance
     */
    getEndpoint = () => this.innerOptions.endpoint


    /**
     * Get the user login token
     * @function
     * @returns {string}
     * @memberof GlobalSetting
     * @instance
     */
    getToken = () => this.innerOptions.getToken()

    /**
     * Get the user login token
     * @function
     * @returns {string}
     * @memberof GlobalSetting
     * @instance
     */
    getTenantGuid = () => this.innerOptions.getTenantGuid()

    /**
     * Get the user login token
     * @function
     * @returns {string}
     * @memberof GlobalSetting
     * @instance
     */
    getDomainGuid = () => this.innerOptions.getDomainGuid()
}()

export { GlobalSetting }
