let express = require("express"),
    path = require("path"),
    m = require("./methods.js");
let router = express.Router();

let viewHTML = "Views/HTML/"
let dirs = ["session", "finish", "account"];


for(let i in dirs)
  router.get("/" + dirs[i], function(req, res) {
    return res.sendFile(path.resolve(__dirname, viewHTML + dirs[i] + ".html"));
  });

module.exports = router;
