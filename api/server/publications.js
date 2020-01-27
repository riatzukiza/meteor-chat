import { Meteor } from 'meteor/meteor';
import { Messages } from '../collections.js';

Meteor.publish("messages", function(room) {
    return Messages.find({room}, {
        fields: {
            name: 1,
            message: 1,
            room: 1,
            createdAt: 1,
            announcement: 1
        },
        limit: 100,
        sort: {
            createdAt: -1
        }
    }); //we want the 100 most recent messages
});
