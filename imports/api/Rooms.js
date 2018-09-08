import { Mongo } from 'meteor/mongo';
import uniqid from 'uniqid';
import { createGame } from './Games';

const Rooms = new Mongo.Collection('rooms');

const setMessage = (user, message, type = 'system') => {
    return { id: uniqid(), user, message, time: new Date(), type };
};

Meteor.methods({
    async 'room.create'({ userId, name }) {
        new SimpleSchema({
            userId: { type: String },
            name: { type: String },
        }).validate({ userId, name });

        if (!Rooms.findOne({ name, closed: false })) {
            return Rooms.insert({
                name,
                userId,
                users: [userId],
                closed: false,
                createdAt: new Date(),
                id: uniqid(),
                master: Meteor.user()._id,
                gameId: null,
            });
        }

        return false;
    },

    async 'room.startGame'({ id }) {
        new SimpleSchema({
            id: { type: String },
        }).validate({ id });

        const room = await Rooms.findOne({ id });
        let users = room.users || [];
        let messages = room.messages || [];
        let user = Meteor.user();

        if (room.master != user._id) {
            return false;
        }

        messages.push(setMessage(user, `Starting game...`));

        Rooms.update(room._id, {
            $set: { messages },
        });

        let gameId = createGame({
            roomId: room.id,
            users,
        });

        Rooms.update(room._id, {
            $set: { gameId },
        });

        return gameId;
    },

    async 'room.join'({ id, userId }) {
        new SimpleSchema({
            id: { type: String },
            userId: { type: String },
        }).validate({ id, userId });

        const room = await Rooms.findOne({ id });
        const user = await Meteor.users.findOne({ _id: userId });
        let users = room.users || [];
        let messages = room.messages || [];

        if (users.indexOf(userId) === -1) {
            users.push(userId);
            messages.push(
                setMessage(user, `User ${user.username} joined the room`)
            );

            return Rooms.update(room._id, {
                $set: { users: users.filter(item => !!item), messages },
            });
        }
    },

    async 'room.leave'({ id, userId }) {
        new SimpleSchema({
            id: { type: String },
            userId: { type: String },
        }).validate({ id, userId });

        const room = await Rooms.findOne({ id });
        const user = await Meteor.users.findOne({ _id: userId });

        let users = room.users || [];
        let messages = room.messages || [];

        let index = users.indexOf(userId);
        if (index !== -1) {
            delete users[index];

            messages.push(
                setMessage(user, `User ${user.username} left the room`)
            );

            Rooms.update(room._id, {
                $set: { users: users.filter(item => !!item), messages },
            });
        }
    },

    async 'room.chat'({ id, userId, message }) {
        new SimpleSchema({
            id: { type: String },
            userId: { type: String },
            message: { type: String },
        }).validate({ id, userId, message });

        const room = await Rooms.findOne({ id });
        const user = await Meteor.users.findOne({ _id: userId });

        let users = room.users || [];
        let messages = room.messages || [];

        if (users.indexOf(userId) !== -1) {
            messages.push(setMessage(user, message, 'chat'));

            Rooms.update(room._id, {
                $set: { messages },
            });
        }
    },
});

export { Rooms };
