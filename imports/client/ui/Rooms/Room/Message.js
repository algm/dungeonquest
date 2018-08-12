import React, { Fragment } from 'react';
import moment from 'moment';
const Message = ({ data }) => {
    let msg = (
        <Fragment>
            <span className="text-primary">
                {'<'}
                {data.user.username}
                {'>'}
            </span>{' '}
            {data.message}
        </Fragment>
    );

    if (data.type == 'system') {
        msg = <span className="text-muted">{data.message}</span>;
    }

    return (
        <div className="message" title={moment(data.time).format('LLL')}>
            {msg}
        </div>
    );
};

export default Message;
