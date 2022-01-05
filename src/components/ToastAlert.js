import React, { useEffect } from "react";

const ToastAlert = ({
  timer = 4000,
  isVisible,
  setIsVisible,
  animation = "w3-animate-top",
  message,
  error = false,
  style = { position: "fixed", width: 360, top: 0, right: 0 },
}) => {
  useEffect(() => {
    const timerHandler = setTimeout(() => {
      if (isVisible) {
        setIsVisible(false);
      }
    }, timer);

    return () => timerHandler;
  }, [isVisible]);

  return (
    <div>
      {isVisible && (
        <div className="w3-center">
          <div className={`w3-container w3-center`}>
            <div
              className={`w3-panel ${
                error ? "w3-red" : "w3-green"
              } w3-round w3-center w3-padding ${animation}`}
              style={{ ...style }}
            >
              <p className="w3-padding w3-center w3-text-white">{message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToastAlert;
