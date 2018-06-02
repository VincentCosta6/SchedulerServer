let express = require("express"),
    path = require("path");
let router = express.Router();

let viewHTML = "Views/HTML/"
let dirs = ["session", "finish"];


for(let i in dirs)
  router.get("/" + dirs[i], function(req, res) {
    return res.sendFile(path.resolve(__dirname, viewHTML + dirs[i] + ".html"));
  });

router.get("/session", function(req, res) {
  res.json({status: "session"});
});

module.exports = router;
