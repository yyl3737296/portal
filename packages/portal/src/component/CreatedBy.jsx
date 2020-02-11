import React from 'react';
import {format} from 'date-fns';

const CreatedBy = (props) => {
    const {createUser, createDate} = props;
    return (
        <div style={{textAlign: 'right'}}>
            <label style={{backgroundColor: 'gray', padding: '0 16px'}}>
                Created By: {createUser}, {format(createDate, 'PPP')}
            </label>
        </div>
    );
};

export default CreatedBy;
export {CreatedBy};
