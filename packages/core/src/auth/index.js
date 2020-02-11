import { AuthAPI } from './auth'
import { SSOService } from './sso'


const Auth = new AuthAPI()

/**
 * SSO sub module, see {@link SSOService} for more methods.
 * @memberOf Auth
 * @instance SSOService
 * @implements {SSOService}
 */
Auth.SSO = new SSOService()

/**
 * Global User instance, see {@link UserAPI} for more methods.
 * @namespace Auth
 * @implements {UserAPI}
 */
export { Auth }
