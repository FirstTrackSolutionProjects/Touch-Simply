import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <ResumeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ResumeProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);