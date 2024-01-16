import { useState } from "react";
import { useTranslation } from "react-i18next";

import axiosClient from "../../../../../config/axios";

import "./login-form.scss";

const LoginForm = () => {
    const { t } = useTranslation("core");
    const [username, setUsername] = useState("fradomecq@gmail.com");
    const [password, setPassword] = useState("password");
    const [login, setLogin] = useState(false);

    const handleLogin = () => {
        axiosClient.get("/user/auth", { params: { username, password } }).then((response) => {
            console.log(response.data);
        });
    };


    return (
        <div className="login-form">
            <h1>{t("login-form.title")}</h1>
            <span>{t("login-form.message")}</span>
            <button onClick={() => {
                handleLogin();
            }}>{t("login-form.redirect-button")}</button>
        </div>
    );
};

export default LoginForm;
