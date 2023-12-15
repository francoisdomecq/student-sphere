import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";

interface AuthenticationProviderProps {
    children: React.ReactNode;
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
    return <Auth0Provider
        domain="dev-pcd86zexlabi2mjm.eu.auth0.com"
        clientId="5aovlZrssMDfrwGbPPWXeFiNMZFxBWXd"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}>{children}</Auth0Provider>;
};

export default AuthenticationProvider;
