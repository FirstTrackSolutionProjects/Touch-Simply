import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <ResumeProvider>
        <AuthProvider>
        <App />
        </AuthProvider>
      </ResumeProvider>
    </BrowserRouter>

);