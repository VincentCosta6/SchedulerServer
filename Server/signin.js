let express = require("express"),
    path = require("path"),
    bcrypt = require("bcrypt"),
    m = require("./methods.js"),
    uuidv4 = require("uuidv4");
let router = express.Router();
let viewHTML = "Views/HTML/"
let dirs = ["login", "signup", "resetAccount"];

let users = m.getUsers();

for(let i in dirs)
  router.get("/" + dirs[i], function(req, res) {
    return res.sendFile(path.resolve(__dirname, viewHTML + dirs[i] + ".html"));
  });

router.get("/usernameTaken", function(req, res) {
  users.findOne({username: req.query.username}, (err, user) => {
    if(err) console.log(err);

    if(!user) return res.json({taken: false});
    else return res.json({taken: true});
  });
});

router.post("/login", function(req, res) {

});

router.post("/signup", function(req, res) {
  bcrypt.hash(req.body.password, m.getStandard(), function(err, hash) {

    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hash,
      permission: "employee",
      IPs: [m.getIP(req)],
      sessionKeys: [uuidv4()]
    };
    m.getDB().collection("users").insert(newUser);
    req.session_state.user = {
      username: req.body.username,
      email: req.body.email,
      permission: "employee"
    };
    req.session_state.key = m.getKey();
    req.session_state.active = true;
    return res.redirect("/finish");
  });

});

module.exports = router;
