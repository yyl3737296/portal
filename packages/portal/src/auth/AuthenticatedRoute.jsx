import React, {useState} from 'react';
import {Route, withRouter} from 'react-router-dom';
// import {Async} from 'react-async';
import {useAsync, IfPending, IfFulfilled, IfRejected} from '@netbrain/component';

import FullPageSpinner from '../general/FullPageSpinner';
import Login from './Login';
// import {Session} from '@netbrain/core';
import PortalUtils from '../PortalUtils';

// https://codesandbox.io/s/basic-auth-example-o73bh
const AuthenticatedRoute = ({component: Component, ...props}) => {
    // console.log('AuthenticatedRoute');
    // console.log(props);
    const {computedMatch} = props;
    const [refresh, setRefresh] = useState();
    const portalKey = PortalUtils.getInstancePrefixKey(computedMatch);

    const sessionTest = async () => {
        //TODO
        //const res = await Session.test();
        //return res.data.data !== undefined;

        // Mock Ajax
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                const u = JSON.parse(localStorage.getItem(portalKey)) || {};
                if (u.token) {
                    resolve(u.token);
                } else {
                    reject(Error('Anonymous access or token is not valid!'));
                }
            }, 0);
        });
    };

    const state = useAsync(async () => {
        const response = await sessionTest();
        const result = await response;
        return result;
    }, [portalKey, refresh]);

    window.matchedRoute = computedMatch;

    return (
        <Route
            {...props}
            render={(p) => (
                <>
                    <IfPending state={state}>
                        <FullPageSpinner></FullPageSpinner>
                    </IfPending>
                    <IfRejected state={state}>
                        {(error) => <Login setRefresh={setRefresh} error={error.message}></Login>}
                    </IfRejected>
                    <IfFulfilled state={state}>
                        {(data) => (data ? <Component></Component> : <Login setRefresh={setRefresh}></Login>)}
                    </IfFulfilled>
                </>
            )}
        ></Route>
    );
};

export default withRouter(AuthenticatedRoute);
