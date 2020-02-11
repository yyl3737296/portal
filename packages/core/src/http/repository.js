import { mappingUrls } from './mapping'
import { Data } from './data';

/**
 * Repository is a Base class for CURD APIs.
 * @class
 *
 */
class Repository {
    constructor() {
        this.$dataApi = Data
    }

    /**
     * Mapping urls to methods.
     * @param {Object} urls - Url lists.
     * @ignore
     * @example
     * constructor() {
     *   const urls = {
     *     getUsers: '/users',
     *     users: { url: '/users', method: 'get' }
     *   }
     *   this.bindUrls(urls)
     * }
     */
    bindingUrls(urls = {}) {
        mappingUrls(urls)(this)
    }
}

export { Repository }
