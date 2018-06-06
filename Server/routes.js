let arr = ["customer", "employee", "manager"];
let express = require("express"),
    m = require("./methods.js"),
    path = require("path"), 
    permission = new (require("./Modules/permissions.js")) (arr);
let router = express.Router();
let ipBanned = [];

let sKey = require("../settings.json").keyVersion;

let db = m.getDB();
let users = m.getUsers();

router.use(function(req, res, next) {
  for(let i in ipBanned)
    if(ipBanned[i] === m.getIP(req))
      return res.json(m.msg(false, "You are banned"));
  next();
});

router.use(require("./signin.js"));

router.use(function(req, res, next) {
  if(!req.session_state || !req.session_state.user || req.session_state.key != sKey || req.session_state.active === false) {
    req.session_state.reset();
    return res.redirect("/login");
  }
  else
    next();
});

router.use(require("./session.js"));

router.use(function(req, res, next) {
  m.getUsers().findOne({username: req.session_state.user.username}, (err, user) => {
    if(err) return m.errorCheck(err);

    if(permission.checkPermission(user.permission, "customer"))
      next();
    else
      return res.json(m.msg(false, "Insufficient permission"));
  });
});

//router.use(require("./customer.js"));

router.use(function(req, res, next) {
  m.getUsers().findOne({username: req.session_state.user.username}, (err, user) => {
    if(err) return m.errorCheck(err);

    if(permission.checkPermission(user.permission, "employee"))
      next();
    else
      return res.json(m.msg(false, "Insufficient permission"));
  });
});

//router.use(require("./employee.js"));

router.use(function(req, res, next) {
  m.getUsers().findOne({username: req.session_state.user.username}, (err, user) => {
    if(err) return m.errorCheck(err);

    if(permission.checkPermission(user.permission, "manager"))
      next();
    else
      return res.json(m.msg(false, "Insufficient permission"));
  });
});
//router.use(require("./manager.js"));

router.use(function(req, res) {
  return res.sendFile(path.resolve(__dirname, "./Views/HTML/404.html"));
});


module.exports = router;
