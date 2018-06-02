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

//app.use(routes);

if(settings.https == true)
{

}

http.createServer(app).listen(settings.httpPort);
console.log("Server initialized on port " + settings.httpPort);
