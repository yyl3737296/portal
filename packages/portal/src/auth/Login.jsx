import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useAsyncFn} from 'react-use';
import {useLocalStorageState} from '@umijs/hooks';

import {Data} from '@netbrain/core';
import Authc from './authc';
import PortalUtils from '../PortalUtils';
import {PORTAL_TYPE} from '../Enum';

const Login = (props) => {
    const {setRefresh, match} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [useTemporaryPassword, setUseTemporaryPassword] = useState(false);
    const [temporaryPassword, setTemporaryPassword] = useState('');
    const portalKey = PortalUtils.getInstancePrefixKey(match);
    const portalType = PortalUtils.getInstancePortalType(match);

    const [, setPortal] = useLocalStorageState(portalKey, {token: undefined, profile: {}});

    const funcs = {
        [PORTAL_TYPE.MAP]: (username, password) => {
            return Authc.loginMapPortal(username, password);
        },
        [PORTAL_TYPE.COLLABORATION]: () => {
            return Authc.loginCollaborationPortal(match.params.ticketId, username, password);
        },
        [PORTAL_TYPE.FUNCTIONAL]: () => {
            return Authc.loginFunctionalPortal(match.params.portalId, username, password);
        }
    };

    const temporaryPasswordFuncs = {
        [PORTAL_TYPE.COLLABORATION]: () => {
            return Authc.loginCollaborationPortalWithTemporaryPassword(match.params.ticketId, temporaryPassword);
        },
        [PORTAL_TYPE.FUNCTIONAL]: () => {
            return Authc.loginFunctionalPortalWithTemporaryPassword(match.params.portalId, temporaryPassword);
        }
    };

    const doLogin = async () => {
        try {
            let res = undefined;
            if (useTemporaryPassword) {
                res = await temporaryPasswordFuncs[portalType]();
            } else {
                res = await funcs[portalType]();
            }

            if (res.data.ProductVersion !== undefined) {
                setPortal((portal) => ({...portal, token: true})); // set more user profile data
                setRefresh(true);
            }
        } catch (e) {
            setPortal((portal) => ({...portal, token: true}));
            setRefresh(true);
        }
    };

    const [cid, setCid] = useState('');
    //'http://10.10.0.25:8888/ServicesAPI/Conf/fix_releaseinfo.txt'
    const [state, fetch] = useAsyncFn(async () => {
        const response = await Data.get('https://anapioficeandfire.com/api/characters/' + cid);
        const result = await response;
        return result;
    }, [cid]);

    const doLogin2 = () => {
        setCid(583);
    };
    const doLogin3 = () => {
        setCid(584);
    };

    useEffect(() => {
        if (cid) {
            fetch();
        }
    }, [cid, fetch]);

    // if rendering
    // https://scotch.io/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
    // https://react-cn.github.io/react/tips/if-else-in-JSX.html
    return (
        <div>
            <h2>Login Page</h2>
            <h6>{props.error}</h6>
            <button onClick={(e) => setUseTemporaryPassword(false)}>Username/Password</button>
            {portalType === PORTAL_TYPE.MAP ? null : (
                <button onClick={(e) => setUseTemporaryPassword(true)}>Temporary Password</button>
            )}
            {!useTemporaryPassword ? (
                <div>
                    <label>Username: </label>
                    <br />
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label>Password: </label>
                    <br />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button onClick={doLogin}>Login</button>
                </div>
            ) : (
                <div>
                    <label>Temporary Password: </label>
                    <br />
                    <input type="password" onChange={(e) => setTemporaryPassword(e.target.value)} />
                    <br />
                    <button onClick={doLogin}>Login</button>
                </div>
            )}
            <button onClick={doLogin2}>useGetAsync2</button>
            <button onClick={doLogin3}>useGetAsync3</button>
            <input type="text" onChange={(e) => setCid(e.target.value)} value={cid} />
            <label>{JSON.stringify(state.value)}</label>
        </div>
    );
};
export default withRouter(Login);
