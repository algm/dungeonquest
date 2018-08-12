import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Rooms } from '../../../api/Rooms';
import { Button } from 'reactstrap';
import Users from './Room/Users';
import { Meteor } from 'meteor/meteor';
import Messages from './Room/Messages';

class Room extends Component {
    componentDidMount() {
        this.joined = false;

        if (this.props.room && this.props.activeUser) {
            this.joinRoom();
        }
    }

    componentDidUpdate() {
        if (this.props.room && this.props.activeUser) {
            this.joinRoom();
        }
    }

    componentWillUnmount() {
        this.leaveRoom();
    }

    async startGame() {
        alert('starts!');
    }

    async joinRoom() {
        await Meteor.callPromise('room.join', {
            id: this.props.room.id,
            userId: this.props.activeUser._id,
        });

        this.joined = true;
    }

    async leaveRoom() {
        if (this.props.room && this.joined) {
            await Meteor.callPromise('room.leave', {
                id: this.props.room.id,
                userId: this.props.activeUser._id,
            });
        }

        this.joined = false;
    }

    render() {
        const { room, activeUser } = this.props;
        let start = null;

        if (!room) {
            return 'loading...';
        }

        if (!activeUser) {
            return (
                <div className="page room-page">
                    <div className="title">
                        <h1>{room.name}</h1>
                    </div>
                    <p>Please login to join the room</p>
                </div>
            );
        }

        console.log(
            activeUser._id === room.master,
            activeUser._id,
            room.master,
            room.users.length
        );

        if (room.users.length > 1 && activeUser._id === room.master) {
            start = (
                <Button onClick={this.startGame.bind(this)} color="primary">
                    Start game!
                </Button>
            );
        }

        return (
            <div className="page room-page">
                <div className="title">
                    <h1>
                        {room.name} {start}
                    </h1>
                </div>
                <Messages
                    messages={room.messages}
                    roomId={room.id}
                    activeUser={activeUser}
                />
                <Users users={room.users} />
            </div>
        );
    }
}

export default withTracker(({ id }) => {
    Meteor.subscribe('rooms');

    return {
        activeUser: Meteor.user(),
        room: Rooms.findOne({ id }),
    };
})(Room);
