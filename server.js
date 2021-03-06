let express = require("express"),
    bodyParser = require("body-parser"),
    clientSessions = require("client-sessions"),
    http = require("http"),
    routes = require("./Server/routes.js");

let settings = require("./settings.json");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(clientSessions({
  secret: "This is a special secret", // can be anything
  maxAge: 23457862344
}));

app.use("/images", express.static("./Server/Views/Images"));
app.use("/css", express.static("./Server/Views/CSS"));
app.use("/js", express.static("./Server/Views/JS"));
app.use(routes);

if(settings.https == true)
{
  let https = require("https");
  https.createServer(app).listen(80);
  console.log("Https initialized on port " + 80);
}

http.createServer(app).listen(settings.httpPort);
console.log("Http Server initialized on port " + settings.httpPort);
