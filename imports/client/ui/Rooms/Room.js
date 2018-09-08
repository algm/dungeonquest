import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../../api/Rooms';
import { Games } from '../../../api/Games';
import { Redirect } from 'react-router-dom';
import Users from './Room/Users';
import Messages from './Room/Messages';
import Foreground from '../Foreground';
import Background from '../Background';
import Page from '../Page';
import AppBar from '../AppBar';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Card,
    CardText,
    CardTitle,
    CardDeck,
    CardBody,
    CardHeader,
    CardFooter,
} from 'reactstrap';

class Room extends Component {
    constructor(props) {
        super(props);

        this.state = { starting: false };
    }

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

    async componentWillUnmount() {
        await this.leaveRoom();
    }

    async startGame() {
        let started = await Meteor.callPromise('room.startGame', {
            id: this.props.room.id,
        });

        if (started) {
            this.setState({
                starting: true,
            });
        }
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

        if (room.users.length > 1 && activeUser._id === room.master) {
            start = (
                <CardFooter>
                    <Button
                        onClick={this.startGame.bind(this)}
                        disabled={this.state.starting}
                        color="primary"
                    >
                        Start game!
                    </Button>
                </CardFooter>
            );
        }

        if (room.gameId) {
            return <Redirect to={`/game/${room.gameId}`} />;
        }

        return (
            <Page className="room-page">
                <Background />
                <Foreground>
                    <AppBar />
                    <CardDeck>
                        <Card>
                            <CardHeader>
                                <CardTitle>{room.name}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Users users={room.users} />
                            </CardBody>
                            {start}
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Chat</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Messages
                                    messages={room.messages}
                                    roomId={room.id}
                                    activeUser={activeUser}
                                />
                            </CardBody>
                        </Card>
                    </CardDeck>
                </Foreground>
            </Page>
        );
    }
}

export default withTracker(({ id }) => {
    return {
        activeUser: Meteor.user(),
        room: Rooms.findOne({ id }),
        game: Games.findOne({ roomId: id }),
    };
})(Room);
