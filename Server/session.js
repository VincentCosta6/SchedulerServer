let express = require("express");
let router = express.Router();

router.get("/session", function(req, res) {
  res.json({status: "session"});
});

module.exports = router;
