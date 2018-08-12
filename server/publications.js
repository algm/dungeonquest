import { Rooms } from '../imports/api/Rooms';

if (Meteor.isServer) {
    Meteor.publish('rooms', function publishRooms() {
        return Rooms.find({});
    });
    Meteor.publish('users', function publishUsers() {
        return Meteor.users.find({}, { fields: { _id: 1, username: 1 } });
    });

    Meteor.startup(() => {
        Rooms._ensureIndex({ name: 1, closed: 1 }, { unique: true });
    });
}
