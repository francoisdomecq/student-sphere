import { useTranslation } from "react-i18next";

import { useAuth0 } from "@auth0/auth0-react";

import "./login-form.scss";

const LoginForm = () => {
    const { t } = useTranslation("core");
    const { loginWithRedirect } = useAuth0();
    return (
        <div className="login-form">
            <h1>{t("login-form.title")}</h1>
            <span>{t("login-form.message")}</span>
            <button onClick={() => loginWithRedirect()}>{t("login-form.redirect-button")}</button>
        </div>
    );
};

export default LoginForm;
