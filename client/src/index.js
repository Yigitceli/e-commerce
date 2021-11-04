import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/system";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
