import {
    Template
} from 'meteor/templating';
import {
    Cookies
} from 'meteor/mrt:cookies';
import {
    Messages
} from '../api/collections.js';
import {Tracker} from "meteor/tracker";
import {ReactiveVar} from "meteor/reactive-var";
import './main.html';
import './message.js';
import './loader.html';
let messagesSub;
let body;

Template.body.onCreated(function bodyOnCreated() {
    body = this;
    const roomName = Cookie.get("room") || "Main Room";
    Cookie.set("room",roomName);
    body.roomName = new ReactiveVar(roomName);

});

Template.body.onRendered(function bodyOnRendered() {

    Tracker.autorun(() => {
        this.messagesSub = this.subscribe("messages",body.roomName.get()); //get messages

        const $messagesScroll = this.$('.messages-scroll');

        //this is used to auto-scroll to new messages whenever they come in

        let initialized = false;

        this.autorun(() => {
            if (this.messagesSub.ready()) {
                Messages.find({}, {
                    fields: {
                        _id: 1
                    }
                }).fetch();
                Tracker.afterFlush(() => {
                    //only auto-scroll if near the bottom already
                    if (!initialized || Math.abs($messagesScroll[0].scrollHeight - $messagesScroll.scrollTop() - $messagesScroll.outerHeight()) < 200) {
                        initialized = true;
                        $messagesScroll.stop().animate({
                            scrollTop: $messagesScroll[0].scrollHeight
                        });
                    }
                });
            }
        });
    })

});

Template.body.helpers({
    roomName() {
        return Cookie.get("room");
    },

    messages() {

        const room = Cookie.get("room")

        console.log({room,roomName:body.roomName.get(),messageSub:body.messagesSub})
        if(body.messagesSub && body.roomName.get() !== room) {
            console.log("changing room")
            body.roomName.set(room)
            body.messagesSub = body.subscribe("messages",room)
        }

        const criteria = {
            room: room ? room : "Main Room"
        };
        console.log({criteria})
        return Messages.find(criteria, {
            sort: {
                createdAt: 1
            }
        }); //most recent at the bottom
    },

    hideHint() {
        return (Cookie.get("hideHint") == "true"); //convert from string to boolean
    }

});

Template.body.events({

    //send message

    'submit form'(event, instance) {

        event.preventDefault();

        const $el = $(event.currentTarget);
        const $input = $el.find('.message-input');

        const data = {
            message: $input.val()
        };
        const userName = Cookie.get("name");
        const roomName = Cookie.get("room");

        if (userName) {
            data.name = userName;
        }

        if(roomName) {
            data.room = roomName;
        } else {
            data.room = "Main Room"
        }

        Meteor.call("sendMessage", data, (error, response) => {
            if (error) {
                alert(error.reason);
            } else {
                console.log({response})
                Cookie.set("name", response.name);
                Cookie.set("room", response.room);
                $input.val("");
            }
        });

    },

    //hide hint in the top right corner

    'click .hide-hint-button'(event, instance) {

        //cookies only understand strings
        Cookie.set("hideHint", (Cookie.get("hideHint") == "true") ? "false" : "true");

    }

});
