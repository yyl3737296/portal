import React from 'react';
import {useAsync} from 'react-use';

const renderFn = (children, ...args) => {
    if (typeof children === 'function') {
        return children(...args);
    }

    return children;
};

export {useAsync};
export const IfPending = ({children, state}) => <>{state.loading ? renderFn(children, state) : null}</>;

export const IfFulfilled = ({children, state}) => {
    if (!state.loading && !state.error) {
        return renderFn(children, state.value, state);
    }

    return null;
};

export const IfRejected = ({children, state}) => <>{state.error ? renderFn(children, state.error, state) : null}</>;
