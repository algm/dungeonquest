import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Rooms } from "../../../api/Rooms";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import Messages from "./Room/Messages";

class Room extends Component {
    componentDidMount() {
        this.joined = false;

        if (this.props.room) {
            this.joinRoom();
        }
    }

    componentDidUpdate() {
        if (this.props.room) {
            this.joinRoom();
        }
    }

    componentWillUnmount() {
        this.leaveRoom();
    }

    async joinRoom() {
        await Meteor.call("room.join", {
            id: this.props.room.id,
            userId: Session.get("userId")
        });

        this.joined = true;
    }

    async leaveRoom() {
        if (this.props.room && this.joined) {
            await Meteor.call("room.leave", {
                id: this.props.room.id,
                userId: Session.get("userId")
            });
        }

        this.joined = false;
    }

    render() {
        const { room } = this.props;

        if (!room) {
            return "loading...";
        }

        return (
            <div className="page room-page">
                <div className="title">
                    <h1>{room.name}</h1>
                </div>
                <Messages messages={room.messages} roomId={room.id} />
            </div>
        );
    }
}

export default withTracker(({ id }) => {
    return {
        room: Rooms.findOne({ id })
    };
})(Room);
