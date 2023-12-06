import React from "react";
import { render } from "react-dom";
import App from "./App";
import "@fontsource/yatra-one";
import "@fontsource/noto-serif/400.css";
import "@fontsource/noto-serif/400-italic.css";
import "./main.css";

const hash = window.location.hash.substring(1);

render(
  <React.StrictMode>
    <App deepLink={hash} />
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement,
);
