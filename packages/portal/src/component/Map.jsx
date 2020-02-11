import React from 'react';
const Map = (props) => {
    const mapId = props.mapId;
    return <div style={{backgroundColor: '#ccc', height: '100%'}}> Here is a map: {mapId}</div>;
};

export default Map;
export {Map};
