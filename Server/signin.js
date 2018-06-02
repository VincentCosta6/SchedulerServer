let express = require("express"),
    path = require("path");
let router = express.Router();
let viewHTML = "Views/"
let dirs = ["login", "signup"];

for(let i in dirs)
  router.get("/" + dirs[i], function(req, res) {
    return res.sendFile(path.resolve(__dirname, viewHTML + dirs[i] + ".html"));
  });


router.get("/index", function(req, res) {
  res.json({status: "signin"});
});

module.exports = router;
