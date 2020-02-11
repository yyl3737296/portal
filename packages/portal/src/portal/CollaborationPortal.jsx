import React from 'react';
import {withRouter} from 'react-router-dom';

const PortalTicket = (props) => {
    const {match} = props;
    const {ticketId} = match.params;
    return (
        <div>
            <h2>Ticket Portal:{ticketId}</h2>
        </div>
    );
};

export default withRouter(PortalTicket);
