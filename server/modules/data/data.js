const exppress = require("express");
const app = exppress();
const csv = require("csv-parse");
const multer = require("multer");
const fs = require("fs");
const http = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(http);
const data = exppress.Router();
const upload = multer({ dest: "uploads/" });
const Controller = require("../../controller");
const controller = new Controller();
const nodemailer = require("nodemailer");

const smtp = global.smtp;
const transporter = nodemailer.createTransport({ ...smtp });

data.get("/", (req, res) => {
  let emails = [];
  emailLength = emails.length;
  let names = [];
  try {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/gi;
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gi;
        let email;
        let name;
        for (const x of row) {
          for (const y of x.split(";")) {
            email = y.match(emailRegex);
            name = y.match(nameRegex);
            if (email !== null) {
              emailLength += 1;
              emails.push(email[0]);
            } else if (
              name !== null &&
              name[0] !== "name" &&
              name[0] !== "email" &&
              email === null
            ) {
              names.push(name.toString());
              nameLength = names.length;
            }
          }
        }
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        res.json({ msg: { email: emails, name: names } });
        (() => {
          io.emit("count", {
            msg: {
              email: emailLength ? emailLength : 0,
              name: nameLength ? nameLength : 0,
            },
          });
        })();
      });
  } catch {
    res.json({ err: "Please select a file to be extracted" });
  }
});

data.post("/send", (req, res) => {
  email = [...req.body["email"]];
  name = [...req.body["name"]];
  emailTitle = req.body["title"];
  emailSubject = req.body.subject;
  for (const x of email) {
    for (const y of name) {
      let template = req.body["template"];
      template = template.replace(/{name}/g, y);
      template = template.replace(/{email}/g, x.toString());
      Emails.push(template);
    }
  }
  res.json({ msg: "Data Submited" });
  controller.schedulerFactory(transporter).start();
});

data.post("/extract", upload.single("file"), (req, res) => {
  filePath = req.file.path;
  res.json({ check: true });
});

data.get("/details", (req, res) => {
  res.json({ data: global });
});

module.exports = data;
