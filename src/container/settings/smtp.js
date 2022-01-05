import { useState } from "react";
import Button from "../../components/button";
import Input from "../../components/input";

const Smtp = ({ style, submit }) => {
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState("true");
  const [smtp, setSmtp] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState();

  const submitHandler = async () => {
    const data = { smtp: { password, secure, smtp, host, port } };
    submit(data);
  };

  return (
    <div className="w3-contanier" style={{ ...style }}>
      <p className="w3-padding w3-bold w3-black w3-center">SMTP Settings</p>
      <form>
        <div className="w3-row">
          <div className="w3-col s12 m6 l6">
            <Input
              type="text"
              placeholder="Host"
              className="w3-border w3-round w3-margin-top"
              value={host}
              actions={setHost}
            />
          </div>
          <div className="w3-col s12 m6 l6">
            <Input
              type="number"
              placeholder="Port"
              className="w3-border w3-round w3-margin-top"
              value={port}
              actions={setPort}
            />
          </div>
        </div>
        <div className="w3-row">
          <div className="w3-col s12 m6 l6">
            <Input
              type="text"
              placeholder="Smpt"
              className="w3-border w3-round w3-margin-top"
              value={smtp}
              actions={setSmtp}
            />
          </div>
          <div className="w3-col s12 m6 l6">
            <Input
              type="password"
              placeholder="Password"
              className="w3-border w3-round w3-margin-top"
              value={password}
              actions={setPassword}
            />
          </div>
        </div>
        <Input
          type="select"
          className="w3-border w3-round w3-margin-top"
          select={[
            { name: "True", value: true },
            { name: "False", value: false },
          ]}
          value={secure}
          actions={setSecure}
        />

        <Button
          text="Set"
          action={submitHandler}
          style={{ marginTop: 10, width: 400 }}
        />
      </form>
    </div>
  );
};

export default Smtp;
