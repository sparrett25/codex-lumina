import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserSyncProvider } from "./contexts/UserSyncContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router> {/* ✅ Router wraps everything */}
      <UserSyncProvider>
        <App />
      </UserSyncProvider>
    </Router>
  </React.StrictMode>
);
