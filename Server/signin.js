let express = require("express"),
    path = require("path"),
    bcrypt = require("bcrypt"),
    m = require("./methods.js"),
    uuidv4 = require("uuidv4");
let router = express.Router();
let viewHTML = "Views/HTML/";

let users = m.getUsers();

function handler2(req, res) {
  console.log("Handling...");
  if(!req.session_state || req.session_state.active === false || !req.session_state.user || !req.session_state.user.username)
  {
    req.session_state.reset();
    return res.sendFile(path.resolve(__dirname, viewHTML + "login.html"));
  }
  else
  {
    console.log("Found...");
    m.getUsers().findOne({username: req.session_state.user.username}, (err, user) => {
        if(err) return m.errorCheck(err);
        if(!user) return res.sendFile(path.resolve(__dirname, viewHTML + "login.html"));
        /*let ip;
        try{
          ip = m.getIP(req);
          console.log(ip);
        } catch(err) {
          console.log(err);
          return res.sendFile(path.resolve(__dirname, viewHTML + "broken.html"));
        }
        let found = false;

        for(let i in user.IPs)
        {
          if(ip === user.IPs[i])
          {
            found = true;
            break;
          }
        }
        if(found === false) {
          return res.sendFile(path.resolve(__dirname, viewHTML + "ipVerify.html"));
        }
        found = false;*/
        for(let i in user.sessionKeys)
        {
          if(req.session_state.sessionKey === user.sessionKeys[i])
          {
            found = true;
            break;
          }
        }
        if(!found) {
          
          req.session_state.reset();
          return res.sendFile(path.resolve(__dirname, viewHTML + "login.html"));
        }
        return res.sendFile(path.resolve(__dirname, viewHTML + "session.html"));
    });
  }
}

router.get("/", handler2);
router.get("/login", handler2);
router.get("/session", handler2);



router.get("/usernameTaken", function(req, res) {
  m.getUsers().findOne({username: req.query.username}, (err, user) => {
    if(err) return m.errorCheck(err);

    if(!user) return res.json({taken: false});
    else return res.json({taken: true});
  });
});

router.post("/login", function(req, res) {
  //param checks
  m.getUsers().findOne({username: req.body.username}, (err, user) => {
    if(err) return m.errorCheck(err);

    if(!user)
    {
      m.getUsers().findOne({email: req.body.username}, (err, user) => {
        if(err) return m.errorCheck(err);

        if(!user) return res.json(m.msg(false, "Username or email not found"));

        return bcrypt.compare(req.body.password, user.password, (err, res2) => {
          if(err) return m.errorCheck(err);

          if(res2 === true) {
            req.session_state.user = {
              username: user.username,
              email: user.email,
              permission: user.permission
            };
            req.session_state.key = m.getKey();
            req.session_state.active = true;
            let sessionKey = uuidv4();
            req.session_state.sessionKey = sessionKey;
            user.sessionKeys.push(sessionKey);
            user.save( (err) => {
              if(err) return m.errorCheck(err);
              return res.json({redirect: "/session"});
            });

          }
          else {
            return res.json(m.msg(false, "Incorrect password!"));
          }
        });
      });
    }
    else {
      return bcrypt.compare(req.body.password, user.password, (err, res2) => {
        if(err) return m.errorCheck(err);
        if(res2 === true) {
          let user2 = {
            username: user.username,
            email: user.email,
            permission: user.permission
          };
          req.session_state.user = user2;
          req.session_state.key = m.getKey();
          req.session_state.active = true;
          let sessionKey = uuidv4();
          req.session_state.sessionKey = sessionKey;
          user.sessionKeys.push(sessionKey);
          user.save( (err) => {
            if(err) return m.errorCheck(err);
            console.log("Success login");
            return res.json({redirect: "/session"});
          });
        }
        else {
          return res.json(m.msg(false, "Incorrect password!"));
        }
      });
    }
  });

});

router.post("/signup", function(req, res) {
  if(req.body.password == "") return res.json(m.msg(false, "Password is invalid"));
  if(req.body.password.length < 3) return res.json(m.msg(false, "Password must be at least 3 characters"));
  m.getUsers().findOne({username: req.body.username}, (err, user) => {
    if(err) return m.errorCheck(err);

    if(!user)
    {
      bcrypt.hash(req.body.password, m.getStandard(), function(err, hash) {
        let sessionKey = uuidv4();
        let newUser = {
          username: req.body.username,
          email: req.body.email,
          password: hash,
          permission: "employee",
          IPs: [m.getIP(req)],
          sessionKeys: [sessionKey]
        };
        m.getDB().collection("users").insert(newUser);
        req.session_state.user = {
          username: req.body.username,
          email: req.body.email,
          permission: newUser.permission
        };
        req.session_state.key = m.getKey();
        req.session_state.active = true;
        req.session_state.sessionKey = sessionKey;
        return res.json({redirect: "/finish"});
      });
    }
    else {
      return res.json(m.msg(false, "Username already exists"));
    }
  })


});



module.exports = router;
