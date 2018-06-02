let users = require("./Modules/Models/users.js");
let mongoose = require("mongoose");
let uri = "mongodb://127.0.0.1:27017";
mongoose.connect(uri);
let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to " + db.name + " database");
});

let key = require("../settings.json").keyVersion;

let SALT_FACTOR = require("../settings.json").saltFactor;
module.exports = {
  getIP: function(req) {
    return (req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0];
  },
  msg: function(passed = false, reason = "Failed") {
    return {passed: passed, reason, reason};
  },
  getDB: function() {
    return db
  },
  getUsers: function() {
    return users;
  },
  getStandard: function() {
    return SALT_FACTOR;
  },
  getKey: function(){
    return key;
  },
  errorCheck: function(err) {
    console.log(err);
    return msg(false, "An error occured");
  }
};
