import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import upload from "../assets/img/upload.svg";
import Nav from "../container/nav/nav";
import { io } from "socket.io-client";
import ToastAlert from "../components/ToastAlert";
import { submitHandler, useToastAlert } from "../assets/scripts/utils";
import Uploader from "../components/uploader";

const Index = () => {
  const socket = io();
  const {toastAlert, isVisible, setIsVisible, message, error} = useToastAlert()
  const [btnText, setBtnText] = useState("Upload File");
  const history = useHistory();

  useEffect(() => {
    socket.on("connected", (resp) => {
      toastAlert(resp.msg);
    });
  }, []);

  const submit = (file) => {
    if (file.name.endsWith("csv")) {
      setBtnText("Loading...");
      let data = new FormData();
      data.append("file", file);
      axios
        .post("/data/extract", data)
        .then((res) => {
          if (res.data["check"] === true) {
            history.push("/Sender");
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      toastAlert("Only CSV Files allowed", true);
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
      <Uploader action={submit} image={upload} btnText = {btnText} />
    </div>
  );
};

export default Index;
