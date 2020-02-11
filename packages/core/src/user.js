import { Repository } from "./http"

class UserAPI extends Repository {
    /**
     * Creates a new UserAPI instance, see {@link Repository} for more methods.
     * @extends {Repository}
     * @constructor
     */
    constructor() {
        super()

        /**
         * @description get user profile
         * @function UserAPI#getUserProfile
         * @param {Object} loginData - login data.
         */

        /**
         * @description get current user permission
         * @function UserAPI#getCurrentUserPermission
         * @param {Object} password - login password.
         */

        /**
         * @description get current user full permission
         * @function UserAPI#getCurrentUserFullPermission
         */

        const urls = {
            getUserProfile: '/admin/getUserProfile',
            getCurrentUserPermission: '/permissions/current',
            getCurrentUserFullPermission: '/permissions/full'
        }

        this.bindingUrls(urls)
    }
}

/**
 * Global User instance, see {@link UserAPI} for more methods.
 * @namespace
 */
export const User = new UserAPI()
