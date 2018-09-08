import { Rooms } from '../imports/api/Rooms';
import { Games } from '../imports/api/Games';

if (Meteor.isServer) {
    Meteor.publish('rooms', function publishRooms() {
        return Rooms.find({});
    });

    Meteor.publish('games', function publishRooms() {
        return Games.find({
            users: Meteor.user()._id,
        });
    });

    Meteor.publish('users', function publishUsers() {
        return Meteor.users.find({}, { fields: { _id: 1, username: 1 } });
    });

    Meteor.startup(() => {
        Rooms._ensureIndex({ name: 1, closed: 1 }, { unique: true });
        Rooms._ensureIndex({ id: 1 }, { unique: true });
        Games._ensureIndex({ id: 1 }, { unique: true });
        Games._ensureIndex({ roomId: 1 }, { unique: true });
        Games._ensureIndex({ users: 1 }, { unique: false });
    });
}
