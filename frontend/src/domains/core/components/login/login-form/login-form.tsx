import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

import axiosClient from "../../../../../config/axios";
import Button from "../../button/button.tsx";
import TextInput from "../../text-input/text-input.tsx";

import "./login-form.scss";

const LoginForm = () => {
    const { t } = useTranslation("core");
    const [username, setUsername] = useState("fradomecq@gmail.com");
    const [password, setPassword] = useState("password");
    const [createAccount, setCreateAccount] = useState(false);

    const handleLogin = () => {
        axiosClient.get("/user/auth", { params: { username, password } }).then((response) => {
            console.log(response.data);
        });
    };

    const handleCreateAccount = () => {
        axiosClient.post("/user/auth", { username, password }).then((response) => {
            console.log(response.data);
        });
    };

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    return (
        <div className="login-form">
            <h1>{t("login-form.title")}</h1>
            <span>{t("login-form.message")}</span>
            <TextInput value={username} onChange={handleChangeUsername} name="username" label={t("login-form.username")}/>
            <TextInput value={password} onChange={handleChangePassword} name="password" label={t("login-form.password")}/>
            <Button onClick={handleLogin}>{t("login-form.submit")}</Button>
        </div>
    );
};

export default LoginForm;
