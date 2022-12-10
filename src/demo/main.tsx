import React from "react";
import { render } from "react-dom";
import App from "./App";
import "@fontsource/yatra-one";
import "@fontsource/im-fell-french-canon";
import "@fontsource/im-fell-french-canon/400-italic.css";
import "./main.css";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
