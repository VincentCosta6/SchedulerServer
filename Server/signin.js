let express = require("express"),
    path = require("path"),
    bcrypt = require("bcrypt");
let router = express.Router();
let viewHTML = "Views/HTML/"
let dirs = ["login", "signup", "resetAccount"];

for(let i in dirs)
  router.get("/" + dirs[i], function(req, res) {
    return res.sendFile(path.resolve(__dirname, viewHTML + dirs[i] + ".html"));
  });


router.post("/login", function(req, res) {

});

module.exports = router;
