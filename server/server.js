const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const moment = require("moment");

const app = express();
const http = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(http);
require('dotenv').config()

const settings = require("./modules/settings/settings");
const data = require("./modules/data/data");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: "10000mb" }));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.get("/Main", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

io.once("connection", (socket) => {
  socket.emit("connected", { msg: "Connected" });
});

global.Time = moment().format();
global.Emails = [];
global.filePath;
global.email;
global.name;
global.timer;
global.emailTitle;
global.emailSubject;
global.email_filter;
global.emailFilter;
global.emailLength;
global.invalidEmail;
global.nameLength;
global.sentMails = 0;
global.batchCounter = 0;
global.smtp = {
  host: "",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: "",
    pass: "",
  },
}

//Handle setings
app.use("/settings", settings);

//api for data data manipulation
app.use("/data", data);

http.listen(process.env.PORT || 3100, () => {
  console.log(`http://localhost:${3100}`);
});
