const express = require("express");
const app = express();
var http = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(http);

const settings = express.Router();
settings.post("/", (req, res, next) => {
  if (req.body["filter"]) {
    email_filter = parseInt(req.body["filter"]);
    emailFilter = email_filter;
    res.json({ msg: "Settings Saved" });
  }

  if (req.body["timer"]) {
    let data = req.body["timer"];
    timer = `${data.sec} ${data.min} ${data.hours} ${data.dayofM} ${data.month} ${data.dayofweek}`;
  } else {
    timer = "1 * * * * *";
  }
});

settings.post("/smtp", (req, res, next) => {
  if (req.body.smtp) {
    if (
      req.body.smtp.smtp.match(
        /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi
      )
    ) {
      smtp = req.body.smtp;
      if (req.body.smtp.secure === "true") {
        smtp.secure = true;
      } else {
        smtp.secure = false;
      }
      res.json({ msg: "Smtp set successfuly" });
    } else {
      res.json({ err: "Invalid Smtp" });
    }
  } else {
    res.json({ err: "Error setting Smtp" });
  }
});

module.exports = settings;
