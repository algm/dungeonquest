import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

const Users = ({ roomUsers }) => (
    <div>
        {roomUsers.map(user => (
            <div key={user._id}>{user.username}</div>
        ))}
    </div>
);

export default withTracker(({ users }) => {
    Meteor.subscribe('users');

    return {
        roomUsers: Meteor.users
            .find({
                _id: {
                    $in: users,
                },
            })
            .fetch(),
    };
})(Users);
