import { GlobalSetting } from '../global-setting';
import { Repository, parseJwtPayload } from "../http"

export class AuthAPI extends Repository {
    /**
     * Creates a new SessionAPI instance, see {@link Repository} for more methods.
     * @extends Repository
     */
    constructor() {
        super()

        /**
         * @description exchange new token for another client app
         * @function AuthAPI#exchange
         */

        /**
         * @description send the logout request
         * @function AuthAPI#logout
         */

        const urls = {
            exchange: { url: '/auth/exchange', method: 'post' },
            logout: { url: '/auth/logout', method: 'post' }
        }

        this.bindingUrls(urls)
    }

    /**
     * @description send the simple login request with username, password
     * @param {string} username - The user account name.
     * @param {string} password - The user password.
     *
     */
    simpleLogin(clientAppId, username, password) {
        return this.login({
            ClientAppId: clientAppId,
            Principal: username,
            Credential: password
        })
    }

    /**
     * @typedef LoginRequest
     * @property {string} ClientAppId - The client app id for current app.
     * @property {string} RealmType - The realm type, one of: Composite|DB|AD|LDAP|TACACS|SAML|ServiceMonitor|ApiKey
     * @property {string} [RealmAlias] - The alias for specified realm type, it usually means Server Instance Alias.
     * @property {string} [RealmId] - The id for specified realm type, it usually means Server Instance ID.
     * @property {string} [Principal] - The user account, can be null if RealmType is ApiKey
     * @property {string} Credential - The user password or Apikey
     * @property {string} Ext - The extended params
     */

    /**
     * @description send the login request
     * @function AuthAPI#login
     * @param {LoginRequest} loginRequest - login request data.
     */
    login(loginRequest) {
        if (!loginRequest) {
            return Promise.reject('Missing login request param.')
        }

        const MergedLoginRequest = {
            ClientAppId: GlobalSetting.getClientAppId(),
            ...loginRequest
        }

        return this.$http.post('/auth/authorize', MergedLoginRequest)
    }

    /**
     * @description parse jwt token playload
     * @param {string} token - jwt token.
     */
    parseJwtPayload(token) {
        return parseJwtPayload(token)
    }
}
