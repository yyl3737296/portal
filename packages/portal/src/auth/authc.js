import { Auth } from '@netbrain/core';

const CLIENT_APP_ID = "portal"

const Authc = {
    loginMapPortal: (username, password) => {
        return Auth.login({
            ClientAppId: CLIENT_APP_ID,
            Principal: username,
            password: password
        })
    },
    loginCollaborationPortal: (ticketId, username, password) => {
        return Auth.login({
            ClientAppId: CLIENT_APP_ID,
            Principal: username,
            password: password,
            Ext: { ticketId }
        })
    },
    loginFunctionalPortal: (portalId, username, password) => {
        return Auth.login({
            ClientAppId: CLIENT_APP_ID,
            Principal: username,
            password: password,
            Ext: { portalId }
        })
    },
    loginCollaborationPortalWithTemporaryPassword: (ticketId, temporaryPassword) => {
        return Auth.login({
            ClientAppId: CLIENT_APP_ID,
            RealmType: 'TicketTemporaryPassword',
            password: temporaryPassword,
            Ext: { ticketId }
        })
    },
    loginFunctionalPortalWithTemporaryPassword: (portalId, temporaryPassword) => {
        return Auth.login({
            ClientAppId: CLIENT_APP_ID,
            RealmType: 'PortalTemporaryPassword',
            password: temporaryPassword,
            Ext: { portalId }
        })
    },
    signout: () => {
        return Auth.logout()
    }
};

export default Authc
