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

router.get("/accountInfo", function(req, res) {
  m.getUsers().findOne({username: req.session_state.user.username}, (err, user) => {
    if(err) return m.errorCheck(err);

    let ret = {
      username: user.username,
      email: user.email,
      First: user.First,
      Last: user.Last,
      Phone: user.Phone,
      permission: user.permission
    };
    return res.json({user: ret});
  });
});

router.get("/redir", function(req, res) {
  console.log(req.query.which);
  if(req.query.which == "Messages")
    return res.redirect("/messages");
  else
    return res.json(m.msg(false, "Incorrect tile"));
});

let cTile = require("./Modules/Tiles/customerTiles");
let eTile = require("./Modules/Tiles/employeeTiles");
let mTile = require("./Modules/Tiles/managerTiles");

router.get("/tileSpace", function(req, res) {
  let perm = req.session_state.user.permission;
  switch(perm) {
    case "customer": 
      return res.json({tiles: cTile});
    case "employee":
      return res.json({tiles: eTile});
    case "manager": 
      return res.json({tiles: mTile});
    default:
      return res.json(m.msg(false, "Could not find your permission"));
  }
});

router.post("/logout", function(req, res) {
  m.getUsers().updateOne({username: req.session_state.user.username}, {$set: {sessionKeys: []}}, (err) => {
    if(err) return m.errorCheck(err);
    req.session_state.reset();
    return res.json({redirect: "/login"});
  });

});


router.post("/finishAccount", function(req, res) {
  if(!req.body.first || req.body.first == "")
    return res.json(m.msg(false, "First name is missing"));

  if(!req.body.last || req.body.last == "")
    return res.json(m.msg(false, "Last name is missing"));

  if(!req.body.phone || req.body.phone == "")
    return res.json(m.msg(false, "Phone number is missing"));

  m.getUsers().updateOne({username: req.session_state.user.username}, {$set: {First: req.body.first, Last: req.body.last, Phone: req.body.phone}}, (err) => {
    if(err) return m.errorCheck(err);
    return res.json({redirect: "/account"});
  });

});

module.exports = router;
