import { Repository } from "./http"

class SettingAPI extends Repository {
    /**
     * Creates a new SettingAPI instance, see {@link Repository} for more methods.
     * @class
     * @extends {Repository}
     * @constructor
     */
    constructor() {
        super(null)
    }

    /**
     * @description get password policy
     */
    getPasswordPolicy() {
        return this.$http.get(`/systemSetting/getPasswordPolicy`)
    }

    /**
     * @description get system setting for specified key
     * @param {string} key - setting key.
     */
    getSystemSetting(key) {
        return this.$http.get(`/systemSetting/getSystemSetting/${key}`)
    }

    /**
     * @description get boolean system setting for specified key
     * @param {string} key - setting key.
     */
    getSystemSettingForBoolValue(key) {
        return this.$http.get(`/systemSetting/getSystemSettingForBoolValue/${key}`)
    }

    /**
     * @description get boolean domain setting for specified key
     * @param {string} key - setting key.
     */
    getDomainSetting(key) {
        return this.$http.get(`/systemSetting/getDomainSetting/${key}`)
    }

    /**
     * @description set domain setting for specified key
     * @param {string} key - setting key.
     * @param {string} value - setting value.
     */
    setDomainSetting(key, value) {
        return this.$http.post(`/systemSetting/setDomainSetting`, { key, value })
    }
}

/**
 * Global setting instance, see {@link UserAPI} for more methods.
 * @namespace
 */
export const Setting = new SettingAPI()
