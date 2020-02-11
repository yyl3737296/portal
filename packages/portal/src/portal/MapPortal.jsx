import React from 'react';
import {withRouter} from 'react-router-dom';
import {Data} from '@netbrain/core';
import FullPageSpinner from '../general/FullPageSpinner';

import {useAsync, IfPending, IfFulfilled, IfRejected} from '@netbrain/component';

const PortalMap = (props) => {
    const {match} = props;
    const {mapId} = match.params;

    const state = useAsync(async () => {
        const response = await Data.get('/characters/' + mapId);
        const result = await response;
        return result;
    });

    return (
        <div>
            <h2>Map Portal:{mapId}</h2>
            <IfPending state={state}>
                <FullPageSpinner></FullPageSpinner>
            </IfPending>
            <IfRejected state={state}>{(error) => <div>Error: {error.message}</div>}</IfRejected>
            <IfFulfilled state={state}>{(data) => <div>Value: {JSON.stringify(data)}</div>}</IfFulfilled>
        </div>
    );
};

export default withRouter(PortalMap);
