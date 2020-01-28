var require = meteorInstall({"api":{"server":{"methods.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// api/server/methods.js                                                   //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let check, Match;
module.link("meteor/check", {
  check(v) {
    check = v;
  },

  Match(v) {
    Match = v;
  }

}, 1);
let Messages;
module.link("../collections.js", {
  Messages(v) {
    Messages = v;
  }

}, 2);
Meteor.methods({
  'sendMessage'(data) {
    check(data, {
      message: String,
      //the message to send
      name: Match.Optional(String),
      //if the user already has a name
      room: Match.Optional(String)
    });

    if (data.message == "") {
      throw new Meteor.Error("message-empty", "Your message is empty");
    }

    let userName = data.name && data.name != "" ? data.name : "Anonymous";
    let roomName = data.room && data.room != "" ? data.room : "Main Room";
    const matchName = data.message.match(/^My name is (.*)/i);
    const matchRoom = data.message.match(/^Join room (.*)/i);
    console.log({
      data
    });

    if (matchName && matchName[1] != "") {
      userName = matchName[1];
      Messages.insert({
        name: "Chat Bot",
        message: "Hey everyone, " + userName + " is here!",
        room: data.room,
        createdAt: new Date(),
        announcement: true
      });
    } else if (matchRoom && matchRoom[1] != "") {
      // tell everyone you left the old room
      roomName = matchRoom[1];
      Messages.insert({
        name: "Chat Bot",
        message: "Hey everyone, " + userName + " left the room.",
        room: data.room,
        createdAt: new Date(),
        announcement: true
      }); // tell everyone in the new room you joined

      Messages.insert({
        name: "Chat Bot",
        message: "Hey everyone, " + userName + " is joined the room",
        room: roomName,
        createdAt: new Date(),
        announcement: true
      });
    } else {
      Messages.insert({
        name: userName,
        message: data.message,
        room: data.room,
        createdAt: new Date()
      });
    }

    return {
      name: userName,
      room: roomName
    };
  }

});
/////////////////////////////////////////////////////////////////////////////

},"publications.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// api/server/publications.js                                              //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Messages;
module.link("../collections.js", {
  Messages(v) {
    Messages = v;
  }

}, 1);
Meteor.publish("messages", function (room) {
  return Messages.find({
    room
  }, {
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
/////////////////////////////////////////////////////////////////////////////

}},"collections.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// api/collections.js                                                      //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
module.export({
  Messages: () => Messages
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Messages = new Mongo.Collection('messages');
/////////////////////////////////////////////////////////////////////////////

}},"server":{"main.js":function module(require,exports,module){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// server/main.js                                                          //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
Meteor.startup(() => {// code to run on server at startup
});
/////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/api/server/methods.js");
require("/api/server/publications.js");
require("/api/collections.js");
require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvYXBpL3NlcnZlci9tZXRob2RzLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9hcGkvc2VydmVyL3B1YmxpY2F0aW9ucy5qcyIsIm1ldGVvcjovL/CfkrthcHAvYXBpL2NvbGxlY3Rpb25zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9zZXJ2ZXIvbWFpbi5qcyJdLCJuYW1lcyI6WyJNZXRlb3IiLCJtb2R1bGUiLCJsaW5rIiwidiIsImNoZWNrIiwiTWF0Y2giLCJNZXNzYWdlcyIsIm1ldGhvZHMiLCJkYXRhIiwibWVzc2FnZSIsIlN0cmluZyIsIm5hbWUiLCJPcHRpb25hbCIsInJvb20iLCJFcnJvciIsInVzZXJOYW1lIiwicm9vbU5hbWUiLCJtYXRjaE5hbWUiLCJtYXRjaCIsIm1hdGNoUm9vbSIsImNvbnNvbGUiLCJsb2ciLCJpbnNlcnQiLCJjcmVhdGVkQXQiLCJEYXRlIiwiYW5ub3VuY2VtZW50IiwicHVibGlzaCIsImZpbmQiLCJmaWVsZHMiLCJsaW1pdCIsInNvcnQiLCJleHBvcnQiLCJNb25nbyIsIkNvbGxlY3Rpb24iLCJzdGFydHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUlBLE1BQUo7QUFBV0MsTUFBTSxDQUFDQyxJQUFQLENBQVksZUFBWixFQUE0QjtBQUFDRixRQUFNLENBQUNHLENBQUQsRUFBRztBQUFDSCxVQUFNLEdBQUNHLENBQVA7QUFBUzs7QUFBcEIsQ0FBNUIsRUFBa0QsQ0FBbEQ7QUFBcUQsSUFBSUMsS0FBSixFQUFVQyxLQUFWO0FBQWdCSixNQUFNLENBQUNDLElBQVAsQ0FBWSxjQUFaLEVBQTJCO0FBQUNFLE9BQUssQ0FBQ0QsQ0FBRCxFQUFHO0FBQUNDLFNBQUssR0FBQ0QsQ0FBTjtBQUFRLEdBQWxCOztBQUFtQkUsT0FBSyxDQUFDRixDQUFELEVBQUc7QUFBQ0UsU0FBSyxHQUFDRixDQUFOO0FBQVE7O0FBQXBDLENBQTNCLEVBQWlFLENBQWpFO0FBQW9FLElBQUlHLFFBQUo7QUFBYUwsTUFB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QixFQUErQyxDQUEvQztBQUkxQyxNQUFNRyxRQUFRLEdBQUcsSUFBSTBCLEtBQUssQ0FBQ0MsVUFBVixDQUFxQixVQUFyQixDQUFqQixDOzs7Ozs7Ozs7OztBQ0pQLElBQUlqQyxNQUFKO0FBQVdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLGVBQVosRUFBNEI7QUFBQ0YsUUFBTSxDQUFDRyxDQUFELEVBQUc7QUFBQ0gsVUFBTSxHQUFDRyxDQUFQO0FBQVM7O0FBQXBCLENBQTVCLEVBQWtELENBQWxEO0FBRVhILE1BQU0sQ0FBQ2tDLE9BQVAsQ0FBZSxNQUFNLENBQ25CO0FBQ0QsQ0FGRCxFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01ldGVvcn0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQge2NoZWNrLCBNYXRjaH0gZnJvbSAnbWV0ZW9yL2NoZWNrJztcbmltcG9ydCB7TWVzc2FnZXN9IGZyb20gJy4uL2NvbGxlY3Rpb25zLmpzJztcblxuTWV0ZW9yLm1ldGhvZHMoe1xuXG4gICAgJ3NlbmRNZXNzYWdlJyhkYXRhKSB7XG5cbiAgICAgICAgY2hlY2soZGF0YSwge1xuICAgICAgICAgICAgbWVzc2FnZTogU3RyaW5nLCAvL3RoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICAgICAgICAgIG5hbWU6IE1hdGNoLk9wdGlvbmFsKFN0cmluZyksIC8vaWYgdGhlIHVzZXIgYWxyZWFkeSBoYXMgYSBuYW1lXG4gICAgICAgICAgICByb29tOiBNYXRjaC5PcHRpb25hbChTdHJpbmcpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkYXRhLm1lc3NhZ2UgPT0gXCJcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE1ldGVvci5FcnJvcihcIm1lc3NhZ2UtZW1wdHlcIiwgXCJZb3VyIG1lc3NhZ2UgaXMgZW1wdHlcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdXNlck5hbWUgPSAoZGF0YS5uYW1lICYmIGRhdGEubmFtZSAhPSBcIlwiKSA/IGRhdGEubmFtZSA6IFwiQW5vbnltb3VzXCI7XG4gICAgICAgIGxldCByb29tTmFtZSA9IChkYXRhLnJvb20gJiYgZGF0YS5yb29tICE9IFwiXCIpID8gZGF0YS5yb29tIDogXCJNYWluIFJvb21cIjtcblxuICAgICAgICBjb25zdCBtYXRjaE5hbWUgPSBkYXRhLm1lc3NhZ2UubWF0Y2goL15NeSBuYW1lIGlzICguKikvaSk7XG4gICAgICAgIGNvbnN0IG1hdGNoUm9vbSA9IGRhdGEubWVzc2FnZS5tYXRjaCgvXkpvaW4gcm9vbSAoLiopL2kpO1xuICAgICAgICBjb25zb2xlLmxvZyh7ZGF0YX0pXG5cbiAgICAgICAgaWYgKG1hdGNoTmFtZSAmJiBtYXRjaE5hbWVbMV0gIT0gXCJcIikge1xuICAgICAgICAgICAgdXNlck5hbWUgPSBtYXRjaE5hbWVbMV07XG4gICAgICAgICAgICBNZXNzYWdlcy5pbnNlcnQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiQ2hhdCBCb3RcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkhleSBldmVyeW9uZSwgXCIgKyB1c2VyTmFtZSArIFwiIGlzIGhlcmUhXCIsXG4gICAgICAgICAgICAgICAgcm9vbTpkYXRhLnJvb20sXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIGFubm91bmNlbWVudDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZihtYXRjaFJvb20gJiYgbWF0Y2hSb29tWzFdICE9IFwiXCIpIHtcbiAgICAgICAgICAgIC8vIHRlbGwgZXZlcnlvbmUgeW91IGxlZnQgdGhlIG9sZCByb29tXG4gICAgICAgICAgICByb29tTmFtZSA9IG1hdGNoUm9vbVsxXTtcbiAgICAgICAgICAgIE1lc3NhZ2VzLmluc2VydCh7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJDaGF0IEJvdFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiSGV5IGV2ZXJ5b25lLCBcIiArIHVzZXJOYW1lICsgXCIgbGVmdCB0aGUgcm9vbS5cIixcbiAgICAgICAgICAgICAgICByb29tOmRhdGEucm9vbSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgYW5ub3VuY2VtZW50OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIHRlbGwgZXZlcnlvbmUgaW4gdGhlIG5ldyByb29tIHlvdSBqb2luZWRcblxuICAgICAgICAgICAgTWVzc2FnZXMuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIkNoYXQgQm90XCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJIZXkgZXZlcnlvbmUsIFwiICsgdXNlck5hbWUgKyBcIiBpcyBqb2luZWQgdGhlIHJvb21cIixcbiAgICAgICAgICAgICAgICByb29tOnJvb21OYW1lLFxuICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICBhbm5vdW5jZW1lbnQ6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTWVzc2FnZXMuaW5zZXJ0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VyTmFtZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBkYXRhLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgcm9vbTpkYXRhLnJvb20sXG4gICAgICAgICAgICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB1c2VyTmFtZSxcbiAgICAgICAgICAgIHJvb206IHJvb21OYW1lXG4gICAgICAgIH07XG5cbiAgICB9XG5cbn0pO1xuIiwiaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBNZXNzYWdlcyB9IGZyb20gJy4uL2NvbGxlY3Rpb25zLmpzJztcblxuTWV0ZW9yLnB1Ymxpc2goXCJtZXNzYWdlc1wiLCBmdW5jdGlvbihyb29tKSB7XG4gICAgcmV0dXJuIE1lc3NhZ2VzLmZpbmQoe3Jvb219LCB7XG4gICAgICAgIGZpZWxkczoge1xuICAgICAgICAgICAgbmFtZTogMSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IDEsXG4gICAgICAgICAgICByb29tOiAxLFxuICAgICAgICAgICAgY3JlYXRlZEF0OiAxLFxuICAgICAgICAgICAgYW5ub3VuY2VtZW50OiAxXG4gICAgICAgIH0sXG4gICAgICAgIGxpbWl0OiAxMDAsXG4gICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgIGNyZWF0ZWRBdDogLTFcbiAgICAgICAgfVxuICAgIH0pOyAvL3dlIHdhbnQgdGhlIDEwMCBtb3N0IHJlY2VudCBtZXNzYWdlc1xufSk7XG4iLCJpbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5cbi8vZGVjbGFyZSB0aGUgTW9uZ28gY29sbGVjdGlvbnMgdG8gdXNlXG5cbmV4cG9ydCBjb25zdCBNZXNzYWdlcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdtZXNzYWdlcycpOyIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gIC8vIGNvZGUgdG8gcnVuIG9uIHNlcnZlciBhdCBzdGFydHVwXG59KTtcbiJdfQ==
