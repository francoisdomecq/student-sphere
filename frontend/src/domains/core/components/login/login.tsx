import { Outlet } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

import LoginForm from "./login-form/login-form.tsx";

const Login = () => {
    const { isAuthenticated } = useAuth0();
    const handleAuthentication = () => {
        if (isAuthenticated) {
            return <Outlet/>;
        }
        return <LoginForm/>;
    };
    return (
        <div>
            {handleAuthentication()}
        </div>
    );
};

export default Login;
