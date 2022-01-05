import home from "../../assets/img/home.png";
import settings from "../../assets/img/settings.png";
import sender from "../../assets/img/email.png";
import upload from "../../assets/img/upload.svg";

const routes = [
  { icon: home, url: "/", name: 'Home' },
  { icon: sender, url: "/Sender", name: "Sender" },
  { icon: settings, url: "/Settings", name: "Settings"  },
];
export default routes;

const images = {
  home,
  settings,
  upload
};
export { images };
