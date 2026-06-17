import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

document.fonts
  .load('24px "Material Symbols Outlined"')
  .then(() => {
    document.documentElement.classList.remove("material-icons-loading");
  })
  .catch(() => {
    // Keep unavailable icon ligatures hidden instead of showing their text names.
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
