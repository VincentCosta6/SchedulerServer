let express = require("express"),
    m = require("./methods.js");
let router = express.Router();
let ipBanned = [];

let sKey = require("../settings.json").keyVersion;

router.use(function(req, res, next) {
  for(let i in ipBanned)
    if(ipBanned[i] === m.getIP(req))
      return res.json(m.msg(false, "You are banned"));
  next();
});

router.use(require("./signin.js"));

router.use(function(req, res, next) {
  if(!req.session_state || !req.session_state.user || req.session_state.key != sKey || req.session_state.active === false)
    return res.redirect("/login");
  else
    next();
});

router.use(require("./session.js"));

router.use(function(req, res) {
  return res.sendFile(path.resolve(__dirname, "./Views/404.html"));
});


module.exports = router;