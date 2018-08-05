import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Rooms } from "../../../api/Rooms";
import { Link } from "react-router-dom";

const RoomList = ({ rooms }) => {
    let content = <div>No rooms available!</div>;

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
            <div className="rooms-available">{content}</div>
        </div>
    );
};

export default withTracker(() => {
    return {
        rooms: Rooms.find({}).fetch()
    };
})(RoomList);
