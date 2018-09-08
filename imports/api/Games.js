import { Mongo } from 'meteor/mongo';
import uniqid from 'uniqid';

const Games = new Mongo.Collection('games');

function createGame({ roomId, users }) {
    return Games.insert({
        id: uniqid(),
        roomId,
        users,
        createdAt: new Date(),
        actions: [],
        state: {},
    });
}

Meteor.methods({
    async 'game.start'({ roomId, users }) {
        new SimpleSchema({
            roomId: { type: String },
            users: { type: Array },
        }).validate({ roomId, users });

        return createGame({ roomId, users });
    },
});

export { Games, createGame };
