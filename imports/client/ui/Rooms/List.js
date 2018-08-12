import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../../api/Rooms';
import { Link } from 'react-router-dom';

const RoomList = ({ rooms, activeUser }) => {
    let content = <div>No rooms available!</div>;
    let newRoom = null;

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
        <div className="page-section room-list">
            <h1>Available games</h1>
            {newRoom}
            <div className="rooms-available">{content}</div>
        </div>
    );
};

export default withTracker(() => {
    Meteor.subscribe('rooms');

    return {
        rooms: Rooms.find({}).fetch(),
        activeUser: Meteor.user(),
    };
})(RoomList);
