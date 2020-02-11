import React from 'react';
import {withRouter} from 'react-router-dom';

const FullPageSpinner = (props) => {
    return (
        <div className="page-loading">
            <h2>Page Loading...</h2>
        </div>
    );
};

export default withRouter(FullPageSpinner);
