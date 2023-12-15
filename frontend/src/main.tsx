import React from "react";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import AuthenticationProvider from "./config/auth0/auth0-provider.tsx";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthenticationProvider>
                <App/>
            </AuthenticationProvider>
        </BrowserRouter>
    </React.StrictMode>
);
