// index.js
// where your node app starts

// init project
const http = require("http");
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/api/:date", function (req, res) {
  var input = req.params.date;
  let myDate;
  if (/\d{5,16}\d$/.test(input) || Date.parse(input)) {
    myDate = new Date(Number.parseInt(input));
    res.json({ unix: myDate.getTime(), utc: myDate.toUTCString() });
  } else {
    res.json({ err: "Invalid Date" });
  }
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const server = http.createServer(app);
server.on("error", (err) => {
  console.log(err);
});
// listen for requests :)
var listener = server.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
