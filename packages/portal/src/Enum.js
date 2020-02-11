export const PORTAL_TYPE = {
    MAP: 1,
    COLLABORATION: 2,
    FUNCTIONAL: 3
}

export const PORTAL_ROUTE_RULE = {
    MAP: '/map/:tenantGuid/:domainGuid/:mapId',
    COLLABORATION: '/ticket/:ticketId',
    FUNCTIONAL: '/:portalId'
}
