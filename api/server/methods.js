import {Meteor} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import {Messages} from '../collections.js';

Meteor.methods({

    'sendMessage'(data) {

        check(data, {
            message: String, //the message to send
            name: Match.Optional(String), //if the user already has a name
            room: Match.Optional(String)
        });

        if (data.message == "") {
            throw new Meteor.Error("message-empty", "Your message is empty");
        }

        let userName = (data.name && data.name != "") ? data.name : "Anonymous";
        let roomName = (data.room && data.room != "") ? data.room : "Main Room";

        const matchName = data.message.match(/^My name is (.*)/i);
        const matchRoom = data.message.match(/^Join room (.*)/i);
        console.log({data})

        if (matchName && matchName[1] != "") {
            userName = matchName[1];
            Messages.insert({
                name: "Chat Bot",
                message: "Hey everyone, " + userName + " is here!",
                room:data.room,
                createdAt: new Date(),
                announcement: true
            });
        } else if(matchRoom && matchRoom[1] != "") {
            // tell everyone you left the old room
            roomName = matchRoom[1];
            Messages.insert({
                name: "Chat Bot",
                message: "Hey everyone, " + userName + " left the room.",
                room:data.room,
                createdAt: new Date(),
                announcement: true
            });
            // tell everyone in the new room you joined

            Messages.insert({
                name: "Chat Bot",
                message: "Hey everyone, " + userName + " is joined the room",
                room:roomName,
                createdAt: new Date(),
                announcement: true
            });
        } else {
            Messages.insert({
                name: userName,
                message: data.message,
                room:data.room,
                createdAt: new Date()
            });
        }

        return {
            name: userName,
            room: roomName
        };

    }

});
