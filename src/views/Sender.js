import React, { useState, useEffect } from "react";
import { CodeEditorEditable } from "react-code-editor-editable";
import "highlight.js/styles/dracula.css";
import Nav from "../container/nav/nav";
import { io } from "socket.io-client";
import remove from "../assets/img/remove.svg";
import { useHistory } from "react-router";
import Batch from "../container/settings/batch";
import ToastAlert from "../components/ToastAlert";
import { submitHandler, useToastAlert } from "../assets/scripts/utils";
import Button from "../components/button";

const Sender = () => {
  const socket = io();
  const { toastAlert, message, error, setIsVisible, isVisible } =
    useToastAlert();
  const [template, setTemplate] = useState(`
  <!DOCTYPE html>
    <html lang="en">
    
    </html>`);
  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const [subject, setSubject] = useState("");
  const [tempView, setTempView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editBtn, setEditBtn] = useState("Edit");
  const [tempBtn, setTempBtn] = useState("View Template");
  const [title, setTitle] = useState();
  const [settings, setSettings] = useState({
    filter: 50,
    timer: {
      sec: "1",
      min: "*",
      hours: "*",
      dayofM: "*",
      month: "*",
      dayofweek: "*",
    },
  });
  // const [emailcount, setEmailcount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    submitHandler("/data").then((resp) => {
      if (!resp.error) {
        setEmail(resp.data.email);
        setName(resp.data.name);
      } else {
        toastAlert(resp.error, true);
      }
    });

    submitHandler("/data/details").then((resp) => {
      if (!resp.error) {
        console.log(resp);
      } else {
        toastAlert(resp.error, true);
      }
    });

    // socket.on("count", (resp) => {
    //   toastAlert(`Extracted ${resp.msg.email} email and ${resp.msg.name} name`);
    // });
    // socket.on("sent", (resp) => {
    //   toastAlert(`${resp.msg.email} mail sent`);
    // });
  }, []);

  const submit = async () => {
    let data = {
      email: email,
      name: name,
      filter: settings.filter,
      subject: subject,
      template: template,
      title: title,
    };
    if (data.email.length >= settings.filter) {
      const resp = await submitHandler("/data/send", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (!resp.error) {
        toastAlert(resp.data);
      } else {
        toastAlert(resp.error, true);
      }
      socket.on("invalidEmail", (resp) => {
        toastAlert(`${resp.msg} is an invalid email`, true);
      });
    } else {
      toastAlert(
        "Default maximum email that can be sent is 50, adjust filter to send less",
        true
      );
    }
  };

  const settingsHandler = async () => {
    let data = { ...settings };
    if (data.timer.sec === "") data.timer.sec = "*";
    if (data.timer.min === "") data.timer.min = "*";
    if (data.timer.hours === "") data.timer.hours = "*";
    if (data.timer.month === "") data.timer.month = "*";
    if (data.timer.dayofweek === "") data.timer.dayofweek = "*";
    const resp = await submitHandler("/settings", {
      method: "POST",
      body: JSON.stringify(settings),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!resp.error) {
      toastAlert(resp.data);
    } else {
      toastAlert(resp.error, true);
    }
  };

  const templateView = () => {
    if (tempView === true) {
      setTempView(false);
      setTempBtn("View Template");
    } else {
      setTempView(true);
      setTempBtn("View Code");
    }
  };

  const editHandler = () => {
    if (edit === true) {
      setEdit(true);
      setEditBtn("Edit");
    } else {
      setEdit(true);
      setEditBtn("Save");
    }
  };

  const deleteHandler = (type, ind) => {
    if (type === "name") {
      const data = [...name];
      data.splice(ind, 1);
      setName(data);
      toastAlert("Section deteled from Name");
    } else if (type === "email") {
      const data = [...email];
      data.splice(ind, 1);
      setEmail(data);
      toastAlert("Section deteled from Email");
    }
  };

  return (
    <div>
      <ToastAlert
        message={message}
        isVisible={isVisible}
        error={error}
        setIsVisible={setIsVisible}
      />
      <Nav history={history} />
      <div className="w3-container">
        <div className="w3-row-padding">
          <div className="w3-col s6 m6 l6" style={{ marginTop: 20 }}>
            <div className="w3-center">
              <p className="w3-padding w3-black w3-margin">
                Create Email Template
              </p>
            </div>
            <div className="w3-container w3-margin-top">
              {(() => {
                if (tempView) {
                  return (
                    <iframe
                      srcDoc={template}
                      style={{
                        width: "100%",
                        height: "70vh",
                        border: "none",
                      }}
                      title="template-view"
                    />
                  );
                } else {
                  return (
                    <CodeEditorEditable
                      value={template}
                      setValue={(setValue) => {
                        setTemplate(setValue);
                      }}
                      width="100%"
                      height="70vh"
                      language="html"
                      inlineNumbers
                    />
                  );
                }
              })()}
              <p
                className="w3-padding w3-bold w3-center"
                style={{ margin: 10, backgroundColor: "#ffc107" }}
              >
                To insert name or email into template use {"{name}"} /{" "}
                {"{email}"}
              </p>
              <div className="w3-center">
                <button
                  type="button"
                  className="w3-btn w3-blue w3-ripple w3-round w3-margin-top"
                  onClick={templateView}
                >
                  {tempBtn}
                </button>
              </div>
            </div>
          </div>
          <div className="w3-col s6 m6 l6" style={{ marginTop: 20 }}>
            <div className="w3-center">
              <p className="w3-padding w3-black w3-margin">Schedule Email</p>
            </div>
            <div className="w3-container">
              <input
                className="w3-input w3-border w3-round"
                placeholder="Email Title"
                value={title}
                onChange={(title) => {
                  setTitle(title.target.value);
                }}
              />
              <input
                className="w3-input w3-border w3-round w3-margin-top"
                placeholder="Email Subject"
                value={subject}
                onChange={(subject) => {
                  setSubject(subject.target.value);
                }}
              />
            </div>
            <div
              className="w3-container w3-black w3-margin-top"
              style={{ width: "100%", height: 400, overflow: "scroll" }}
            >
              <div className="w3-row-padding">
                <div className="w3-container">
                  <div className="w3-col s6 m6 l6" contentEditable={`${edit}`}>
                    {email.map((data, ind) => {
                      return (
                        <div className="w3-row-padding" key={`email-${ind}`}>
                          <div className="w3-col s9 l9 m9">
                            <input
                              className={`w3-padding w3-border w3-round w3-margin-top w3-padding w3-input w3-black w3-text-white`}
                              style={{ width: "95%" }}
                              key={ind}
                              value={data}
                              onChange={(value) => {
                                let data = [...email];
                                data[ind] = value.target.value;
                                setEmail(data);
                              }}
                            />
                          </div>
                          <div className="w3-rest">
                            <img
                              className="w3-padding w3-margin-top"
                              alt="delete"
                              src={remove}
                              style={{ width: 50 }}
                              onClick={() => deleteHandler("email", ind)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w3-col s6 m6 l6">
                    {name.map((data, ind) => {
                      return (
                        <div className="w3-row-padding" key={`name-${ind}`}>
                          <div className="w3-col s9 l9 m9">
                            <input
                              className={`w3-padding w3-border w3-round w3-margin-top w3-padding w3-input w3-black w3-text-white`}
                              style={{ width: "95%" }}
                              key={ind}
                              value={data}
                              onChange={(value) => {
                                let data = [...name];
                                name[ind] = value.target.value;
                                setName(data);
                              }}
                            />
                          </div>
                          <div className="w3-rest">
                            <img
                              className="w3-padding w3-margin-top"
                              alt="delete"
                              src={remove}
                              style={{ width: 50 }}
                              onClick={() => deleteHandler("name", ind)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Batch
              batch={settings}
              setbatch={setSettings}
              batchHandler={settingsHandler}
            />
            <Button
              action={submit}
              style={{ width: 400, marginTop: 10 }}
              text={"Send Email"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sender;
