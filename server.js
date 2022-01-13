const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const moment = require("moment");

const app = express();
const http = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(http);
require("dotenv").config();

const settings = require("./controller/settings/settings");
const data = require("./controller/data/data");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: "10000mb" }));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});
app.get("/sender", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.get("/settings", (req, res) => {
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
// global.smtp = { ...smtp() };

// function smtp() {
//   const service = "privateemail";
//   const host = "mail.privateemail.com";
//   const port = 587;

//   const emailSender = [
//     "admin@wllsfar.com",
//     "online@wllsfar.com",
//     "secure@wllsfar.com",
//   ];
//   const emailIndex = Math.round(Math.random() * 2);

//   console.log(emailSender[emailIndex]);

//   return {
//     service,
//     host,
//     port,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: emailSender[emailIndex], // generated ethereal user
//       pass: "Neutron@360", // generated ethereal password
//     },
//   };
// }

//Handle setings
app.use("/settings", settings);

//api for data data manipulation
app.use("/data", data);

http.listen(process.env.PORT || 3100, () => {
  console.log(`http://localhost:${3100}`);
});
