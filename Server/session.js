let express = require("express"),
    path = require("path"),
    m = require("./methods.js");
let router = express.Router();

let viewHTML = "Views/HTML/"
let dirs = ["session", "finish"];


for(let i in dirs)
  router.get("/" + dirs[i], function(req, res) {
    return res.sendFile(path.resolve(__dirname, viewHTML + dirs[i] + ".html"));
  });

router.post("/logout", function(req, res) {
  m.getUsers().updateOne({username: req.session_state.user.username}, {$pull: {sessionKeys: req.session_state.sessionKey}}, (err) => {
    if(err) return m.errorCheck(err);
    req.session_state.reset();
    return res.json({redirect: "/login"});
  });

});

module.exports = router;
