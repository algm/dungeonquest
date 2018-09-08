import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Games } from '../../../api/Games';
import { Rooms } from '../../../api/Rooms';
import { range } from 'range';
import Page from '../Page';
import Foreground from '../Foreground';
import Background from '../Background';

const Board = () => (
    <div className="board">
        {range(0, 10).map(i => (
            <div key={i} className="row">
                {range(0, 13).map(j => (
                    <div key={j} className="cell">
                        {`${i + 1}-${j + 1}`}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

class Game extends Component {
    render() {
        const { room, game } = this.props;

        if (!room) {
            return 'loading...';
        }

        return (
            <Page className="game-page">
                <Background img={null}>
                    <div className="board-container">
                        <Board />
                    </div>
                </Background>
                <Foreground>
                    <div className="game-hud">
                        <h1>{room.name}</h1>
                        <pre>{JSON.stringify(game, null, 4)}</pre>
                    </div>
                </Foreground>
            </Page>
        );
    }
}

export default withTracker(({ id }) => {
    return {
        activeUser: Meteor.user(),
        game: Games.findOne({ _id: id }),
        room: Rooms.findOne({ gameId: id }),
    };
})(Game);
