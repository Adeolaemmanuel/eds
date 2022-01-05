import { submitHandler, useToastAlert } from "../assets/scripts/utils";
import ToastAlert from "../components/ToastAlert";
import Batch from "../container/settings/batch";
import React, { useState } from "react";
import Nav from "../container/nav/nav";
import { useHistory } from "react-router";
import Smtp from "../container/settings/smtp";

const Settings = () => {
  const { toastAlert, message, isVisible, error, setIsVisible } =
    useToastAlert();
  const history = useHistory();
  const [batch, setBatch] = useState({
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
  const batchHandler = async () => {
    let data = { ...batch };
    if (data.timer.sec === "") data.timer.sec = "*";
    if (data.timer.min === "") data.timer.min = "*";
    if (data.timer.hours === "") data.timer.hours = "*";
    if (data.timer.month === "") data.timer.month = "*";
    if (data.timer.dayofweek === "") data.timer.dayofweek = "*";
    const resp = await submitHandler("/settings", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (!resp.error) {
      toastAlert(resp.data);
    } else {
      toastAlert(resp.error, true);
    }
  };

  const smtpHandler = async (data) => {
    let resp = await submitHandler("/settings/smtp", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (resp.error) {
      toastAlert(resp.error, true);
    } else {
      toastAlert(resp.data);
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
      <div className="w3-row">
        <div className="w3-col s12 m12 l6">
          <Smtp style={{ marginTop: 10 }} submit={smtpHandler} />
        </div>
        <div className="w3-col s12 m12 l6">
          <Batch
            batch={batch}
            setBatch={setBatch}
            batchHandler={batchHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
