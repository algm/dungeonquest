import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../../api/Rooms';
import { Link } from 'react-router-dom';
import {
    Card,
    CardText,
    CardTitle,
    CardBody,
    CardHeader,
    CardFooter,
} from 'reactstrap';

const RoomList = ({ rooms, activeUser }) => {
    let content = <div>No rooms available!</div>;
    let newRoom = <CardText>Login to create a game</CardText>;

    console.log(activeUser);

    if (activeUser) {
        newRoom = (
            <Link to="/newgame" className="btn text-light btn-secondary">
                New Room
            </Link>
        );
    }

    if (rooms && rooms.length) {
        content = rooms.map(room => (
            <div key={room.id}>
                <Link to={`/room/${room.id}`}>{room.name}</Link>
            </div>
        ));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h2">Available games</CardTitle>
            </CardHeader>
            <CardBody tag="div">
                <div className="rooms-available">{content}</div>
            </CardBody>
            <CardFooter>{newRoom}</CardFooter>
        </Card>
    );
};

export default withTracker(() => {
    return {
        rooms: Rooms.find({}).fetch(),
        activeUser: Meteor.user(),
    };
})(RoomList);
