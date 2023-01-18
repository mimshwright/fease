import React from "react";
import { render } from "react-dom";
import App from "./App";
import "@fontsource/yatra-one";
import "@fontsource/im-fell-french-canon";
import "@fontsource/im-fell-french-canon/400-italic.css";
import "./main.css";

const path = window.location.hash;
const [, category, subcategory] = path.split("/");

render(
  <React.StrictMode>
    <App category={category} subcategory={subcategory} />
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
);
