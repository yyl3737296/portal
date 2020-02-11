import React from 'react';
import PropTypes from 'prop-types';

const PathMap = (props) => {
    return <button type="button">Test Map</button>; // 123
};

PathMap.propTypes = {
    basic: PropTypes.shape({
        id: PropTypes.string.isRequired
    }),
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataview: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.string)])
    }),
    ui: PropTypes.shape({
        border: PropTypes.shape({
            enabled: PropTypes.bool.isRequired,
            size: PropTypes.number,
            color: PropTypes.string
        }),
        backgroudColor: PropTypes.string
    }),
    events: PropTypes.arrayOf(
        PropTypes.shape({
            componentid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    )
};

PathMap.defaultProps = {};

export default PathMap;
