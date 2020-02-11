import qs from 'query-string'

import { GlobalSetting } from '../global-setting';
import { Http } from "../http"

/**
 * SSO Class
 * @class
 */
export class SSOService {
    /**
     * @typedef SSOLoginRequest
     * @property {string} ClientAppId - The client app id for current app.
     * @property {string} RealmType - The realm type, one of: SAML
     * @property {string} RealmAlias - The alias for specified realm type, it usually means Server Instance Alias.
     * @property {string} processUrl - The url on web app to process authentication code from NetBrain API redirect.
     */

    /**
     * get the redirect sso url
     * @param {SSOLoginRequest} loginRequest - SSO login request data.
     */
    getRedirectUrl(loginRequest) {
        if (!loginRequest) {
            return Promise.reject('Missing login request param.')
        }

        const SUPPORT_REALM_TYPES = ['saml2']
        const clientAppId = GlobalSetting.getClientAppId()
        const endpoint = GlobalSetting.getEndpoint()
        // eslint-disable-next-line prefer-const
        let { realmType, realmAlias, processUrl } = loginRequest


        if (['saml', 'saml2.0'].includes(realmType.toLowerCase())) {
            realmType = 'saml2'
        }

        if (!realmType || !SUPPORT_REALM_TYPES.includes(realmType.toLowerCase())) {
            throw new Error(`Only support SSO type: ${SUPPORT_REALM_TYPES.join().toUpperCase()}`)
        }

        // http://ie.netbrain.com/servicesapi/sso/saml2/authorizeservice?clientAppId={clientAppId}&alias={alias}&processUrl={processUrl}
        const proxyUrl = `${endpoint}/sso/${realmType}/authorizeservice?clientAppId=${clientAppId}&alias=${realmAlias}&processUrl=${processUrl}`

        return proxyUrl
    }

    /**
     * collection authentication code on current url and do auto login
     */
    login() {
        // http://ie.netbrain.com/portal/sso.html?type=saml&alias=xxx&clientAppId=&authenticationCode=yyy&error=zzz
        const { type, alias, clientAppId, authenticationCode, error } = qs.parse(window.location.search)

        if (type && alias && clientAppId) {
            return Http.post('/auth/saml2/authorize', { authenticationCode })
        }

        return Promise.reject(error || "Unknown error!");
    }
}
