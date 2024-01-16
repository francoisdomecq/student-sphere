import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { AppContext } from "../../../../config/contexts/app-context.tsx";

import LoginForm from "./login-form/login-form.tsx";


const Login = () => {
    const { userInfo } = useContext(AppContext);
    if (!userInfo) {
        return <LoginForm/>;
    } else {
        return <Outlet/>;
    }

};

export default Login;
