import React, { useState, useEffect } from "react";

const submitHandler = async (url, config = null) => {
  const resp = await fetch(url, { ...config });
  const data = await resp.json();
  return {
    data: data.msg,
    error: data.err ? data.err : false,
  };
};

const useToastAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(0);

  const toastAlert = (message, error = false, timer = 2000) => {
    setIsVisible(true);
    setMessage(message);
    setError(error);
    setTimer(timer);
  };

  return { toastAlert, isVisible, error, message, setIsVisible, timer };
};

export { submitHandler, useToastAlert };
