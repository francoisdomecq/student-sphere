import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserInfos, UserLogin } from "../../domains/user/types";
import axiosClient from "../axios";

import useStoreUserInfo from "./hooks/use-store-user-info.tsx";

interface AppContextProps {
  children: React.ReactNode
}

interface AppContextInterface {
  userInfo: UserInfos;
  logUser: (user: UserLogin) => void;
}

const AppContext = React.createContext <(AppContextInterface)>({} as AppContextInterface);

const AppContextProvider = ({ children }: AppContextProps) => {
    const { getLocalUserInfo, storeLocalUserInfo } = useStoreUserInfo();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserInfos>(getLocalUserInfo());

    const logUser = useCallback((user: UserLogin) => {
        const queryParams = { params: user };
        axiosClient.get<{user: UserInfos, token: string}>("/user/auth", queryParams)
            .then(response => {
                setUserInfo(response.data.user);
                storeLocalUserInfo(response.data.user, response.data.token);
                navigate("/home");
            });
    }, [navigate, storeLocalUserInfo]);

    const contextValue = useMemo(() => ({
        userInfo,
        logUser
    }), [userInfo, logUser]);

    return (
        <AppContext.Provider
            value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export {
    AppContext,
    AppContextProvider
};