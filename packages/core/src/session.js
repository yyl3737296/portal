import { Repository } from "./http"

class SessionAPI extends Repository {
    /**
     * Creates a new SessionAPI instance, see {@link Repository} for more methods.
     * @extends {Repository}
     * @constructor
     */
    constructor() {
        super()

        /**
         * @description Check session is avaiable and keep it.
         * @function SessionAPI#test
         */

        /**
         * @description Keep session alive for specified broswer tab
         * @function SessionAPI#keepAlive
         * @param {string} tabId - Broswer tab id.
         */

        const urls = {
            test: { url: '/session/test', method: 'get' },
            isValidSession: { url: '/session/IsValidSession', method: 'get' }, // same save above, need remove
            keepSession: { url: '/keepSession/:tabId', method: 'get' }, // same save above, need remove
            keepAlive: { url: '/keepalive/:tabId', method: 'get' }
        }

        this.bindingUrls(urls)
    }
}

/**
 * Global Session instance, see {@link SessionAPI} for more methods.
 * @namespace
 */
export const Session = new SessionAPI()
