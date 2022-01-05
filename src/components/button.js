import { Children } from "react";

const Button = ({
  style,
  text,
  action,
  className = "w3-btn w3-blue w3-ripple w3-round w3-padding",
  dom,
  children,
}) => {
  return (
    <div className="w3-center">
      <button
        type="button"
        className={className}
        onClick={action}
        {...dom}
        style={{ ...style }}
      >
        {text ? text : children}
      </button>
    </div>
  );
};

export default Button;
