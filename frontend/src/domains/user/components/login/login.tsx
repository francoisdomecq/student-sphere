import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";


import { AppContext } from "../../../../config/contexts/app-context.tsx";
import Button from "../../../core/components/button/button.tsx";
import HomePage from "../../../core/components/home-page/home-page.tsx";
import TextInput from "../../../core/components/text-input/text-input.tsx";
import { UserLogin } from "../../types";

import "./login.scss";


const Login = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("user");
    const { logUser, userInfo } = useContext(AppContext);
    const [userLogin, setUserLogin] = useState<UserLogin>({ username: "fradomecq@gmail.com", password: "password" });
    const [createAccount, setCreateAccount] = useState<boolean>(false);

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        logUser(userLogin);
    };

    const handleChangeUserLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setUserLogin({ ...userLogin, [event.target.name]: event.target.value });
    };

    const handleCreateAccount = () => {
        setCreateAccount(true);
        navigate("sign-in");
    };

    return !userInfo || createAccount ? (
        <HomePage>
            <form className="login-form" onSubmit={handleLogin}>
                <h1>{t("login-form.title")}</h1>
                <span>{t("login-form.message")}</span>
                <TextInput value={userLogin?.username} onChange={handleChangeUserLogin} name="username"
                    label={t("login-form.username-input")}/>
                <TextInput value={userLogin?.password} onChange={handleChangeUserLogin} type="password" name="password"
                    label={t("login-form.password-input")}/>
                <Button type="submit">{t("login-form.submit-button")}</Button>
            </form>
            <div>
                <p onClick={handleCreateAccount}>Créer un compte</p>
            </div>
        </HomePage>
    ) : (
        <Outlet/>
    );
};

export default Login;
