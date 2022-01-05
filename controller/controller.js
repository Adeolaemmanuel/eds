const exppress = require("express");
const app = exppress();
const CronJob = require("cron").CronJob;
const fs = require("fs");
const EmailValidator = require("email-deep-validator");
const http = require("http").Server(app);
const { Server } = require("socket.io");
const io = new Server(http);
const validate = new EmailValidator()

class Controller {
  // function to be called for batch email sending
  schedulerFactory = function (transporter) {

    return {
      start: function () {
        //Seconds: 0-59
        //Minutes: 0-59
        //Hours: 0-23
        //Day of Month: 1-31
        //Months: 0-11 (Jan-Dec)
        //Day of Week: 0-6 (Sun-Sat)
        //curent batch time = 1 min
        new CronJob(
          timer,
          async () => {
            let emailBatch = Emails.splice(
              emailFilter - email_filter,
              emailFilter
            );
            let emails = email.splice(emailFilter - email_filter, emailFilter);
            let repName = name.splice(emailFilter - email_filter, emailFilter);
            let msg;
            if (emailFilter <= Emails.length) {
              for (let x = 0; x < emails.length; x++) {
                const { wellFormed, validDomain } =
                  await validate.verify(emails[x]);
                if (wellFormed && validDomain) {
                  console.log(email[x]);
                  msg = {
                    to: emails[x].toString(),
                    from: "",
                    subject: emailSubject,
                    repName: repName[x].toString(),
                    emailTitle: emailTitle,
                    html: emailBatch[x].split("\n").join(""),
                  };
                  if (msg.repName) {
                    
                    transporter.sendMail(
                      {
                        // from: "account@office365username.email",
                        from: `Acount ${smtp.smtp}`,
                        to: `${msg.repName} <${msg.to}>`,
                        subject: msg.subject,
                        html: msg.html,
                        envelope: {
                          from: `Acount ${smtp.smtp}`,
                          to: `${msg.repName} <${msg.to}>`,
                        },
                      },
                      (err, info) => {
                        if (err) {
                          console.log({ err });
                        } else {
                          console.log(info.envelope);
                          console.log(info.messageId);
                        }
                      }
                    );
                  } else {
                    msg.repName = "";
                    transporter.sendMail(
                      {
                        // from: "account@office365username.email",
                        from: "Account <account@office365username.email>",
                        to: `${msg.repName} <${msg.to}>`,
                        subject: msg.subject,
                        html: msg.html,
                        envelope: {
                          from: "Account <account@office365username.email>",
                          to: `${msg.repName} <${msg.to}>`,
                        },
                      },
                      (err, info) => {
                        if (err) {
                          console.log({ err });
                        } else {
                          console.log(info.envelope);
                          console.log(info.messageId);
                        }
                      }
                    );
                  }
                } else {
                  invalidEmail = emails[x];
                  io.emit("invalidEmail", { msg: invalidEmail });
                  console.log(invalidEmail, "invalid");
                }
              }
              console.log("Running Send Notifications Worker for " + Time);
              console.log(
                `start:${emailFilter - email_filter}, end:${emailFilter}`
              );
              sentMails = emailFilter - email_filter;
              emailFilter += email_filter;
            }
          },
          null,
          true,
          ""
        );
      },
    };
  };
}

module.exports = Controller;
