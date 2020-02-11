import React from 'react';

import CreatedBy from './CreatedBy';
import Map from './Map';
import PathMap from './PathMap';

const list = {CreatedBy, Map, PathMap};

export const selector = (type) => {
    const k = Object.keys(list).find((key) => key.toLowerCase() === type.toLowerCase());
    if (k) {
        return list[k];
    }
    return <div>Not Found.</div>;
};
export default selector;
