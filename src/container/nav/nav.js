import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import menu from "../../assets/img/menu.png";
import Uploader from "../../components/uploader";
import routes from "./routes";
import axios from "axios";
const Nav = () => {
  const [sideBar, setSidebar] = useState(false);
  const history = useHistory();
  const currentPath = history.location.pathname;

  useEffect(() => {
    const navAutoClose = document.addEventListener("mousedown", (event) => {
      if (sideBar === true) setSidebar(false);
    });

    return () => document.removeEventListener("mousedown", navAutoClose);
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
            history.push("/sender");
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
      <nav className="w3-bar w3-padding w3-card">
        <div
          className="w3-bar-item w3-button w3-hover-white w3-ripple w3-round w3-padding"
          onClick={() => {
            if (!sideBar) {
              setSidebar(true);
            } else {
              setSidebar(false);
            }
          }}
        >
          <img src={menu} alt={menu} width={30} height={30} />
        </div>
        <div className="w3-bar-item w3-right">
          {currentPath !== "/" && <Uploader action={submit} btnText="Upload" />}
        </div>
      </nav>

      {sideBar && (
        <nav className="w3-sidebar w3-bar-block w3-card w3-animate-left">
          {routes.map((route) => {
            return (
              <div className="w3-padding w3-bar-item w3-margin-top">
                <img src={route.icon} alt={route.icon} width={30} height={30} />
                <a
                  className=" w3-margin-left w3-margin-top w3-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(route.url);
                    history.push(route.url);
                  }}
                >
                  {route.name}
                </a>
              </div>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Nav;
