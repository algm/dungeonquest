import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { AccountsReactComponent } from 'meteor/meteoreact:accounts';
import {
    Card,
    CardText,
    CardTitle,
    CardBody,
    CardHeader,
    CardFooter,
} from 'reactstrap';

const Info = ({ activeUser }) => {
    let content = <AccountsReactComponent />;

    if (activeUser) {
        content = `Hello ${activeUser.username}`;
    }

    return <Card>{content}</Card>;
};

export default withTracker(() => {
    return {
        activeUser: Meteor.user(),
    };
})(Info);
