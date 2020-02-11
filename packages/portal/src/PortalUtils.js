import { PORTAL_TYPE, PORTAL_ROUTE_RULE } from './Enum'

const PortalUtils = {
    getInstancePrefixKey: (matchedObject) => {
        let PortalKey = 'portal:map';
        switch (matchedObject.path) {
            case PORTAL_ROUTE_RULE.MAP:
                PortalKey = 'portal:map';
                break;
            case PORTAL_ROUTE_RULE.COLLABORATION:
                PortalKey = 'portal:ticket:' + matchedObject.params.ticketId;
                break;
            case PORTAL_ROUTE_RULE.FUNCTIONAL:
                PortalKey = 'portal:functional:' + matchedObject.params.portalId;
                break;
            default:
        }

        return PortalKey
    },
    getInstancePortalType: (matchedObject) => {
        switch (matchedObject.path) {
            case PORTAL_ROUTE_RULE.MAP:
                return PORTAL_TYPE.MAP
            case PORTAL_ROUTE_RULE.COLLABORATION:
                return PORTAL_TYPE.COLLABORATION
            case PORTAL_ROUTE_RULE.FUNCTIONAL:
                return PORTAL_TYPE.FUNCTIONAL
            default:
        }
        return PORTAL_TYPE.MAP
    }

};

export default PortalUtils
