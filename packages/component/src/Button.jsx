import React from 'react';
import {GlobalSetting, Http, Auth} from '@netbrain/core';
import './Button.scss';

const Button1 = (props) => <div className="test">{props.text}</div>; // 123

GlobalSetting.init({
    endpoint: 'https://anapioficeandfire.com/api/',
    getToken: () => 'token123',
    getTenantGuid: () => 'tenantguid-123',
    getDomainGuid: () => 'domainguid-123'
});
Http.useInterceptors().request.use(
    (config) => config,
    (error) => Promise.reject(error)
);
window.DomainAPI = Http.createIsolatedInstance('111', '222');
window.DomainAPI.useInterceptors().request.use(
    (config) => config,
    (error) => Promise.reject(error)
);
window.http = Http;
window.GlobalSetting = GlobalSetting;
window.Auth = Auth;
Button1.Defintation = {datasource: String};
Button1.propTypes = {};
Button1.defaultProps = {};
export default Button1;
export const Button = Button1;
