import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import event from './event';

import AuthenticatedRoute from './auth/AuthenticatedRoute';
import './App.css';

window.nbEvent = event;

// Async component
// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
// https://github.com/jamiebuilds/react-loadable
const MapPortal = lazy(() => import('./portal/MapPortal'));
const CollaborationPortal = lazy(() => import('./portal/CollaborationPortal'));
const FunctionalPortal = lazy(() => import('./portal/FunctionalPortal'));
const Default = lazy(() => import('./portal/Default'));

// https://segmentfault.com/a/1190000016421036
function App() {
    return (
        <Router basename={window.NetBrain.Portal.Config.BaseUrl}>
            <div className="App">
                <div className="App-header">
                    <Link to="/map/x/y/583">Map</Link> --
                    <Link to="/ticket/123456">Ticket</Link> --
                    <Link to="/123456">Portal</Link>
                </div>

                <div className="">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route path="/" exact component={Default}></Route>
                            <AuthenticatedRoute
                                exact
                                path="/map/:tenantGuid/:domainGuid/:mapId"
                                component={MapPortal}
                            ></AuthenticatedRoute>
                            <AuthenticatedRoute
                                exact
                                path="/ticket/:ticketId"
                                component={CollaborationPortal}
                            ></AuthenticatedRoute>
                            <AuthenticatedRoute
                                exact
                                path="/:portalId"
                                component={FunctionalPortal}
                            ></AuthenticatedRoute>
                            <Route component={Default}></Route>
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </Router>
    );
}

export default App;
