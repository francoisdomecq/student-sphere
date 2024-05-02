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
  setUserInfo: (value: UserInfos) => void;
  isLoggedIn: boolean;
  storeIsLoggedIn: () => void;
  logUser: (user: UserLogin) => void;
}

const AppContext = React.createContext <(AppContextInterface)>({} as AppContextInterface);

const AppContextProvider = ({ children }: AppContextProps) => {
    const { getLocalUserInfo, storeIsLoggedIn, getIsLoggedIn } = useStoreUserInfo();
    const navigate = useNavigate();

    const [isLoggedIn] = useState<boolean>(getIsLoggedIn());
    const [userInfo, setUserInfo] = useState<UserInfos>(getLocalUserInfo());

    const logUser = useCallback((user: UserLogin) => {
        axiosClient.get("/user/auth", { params: { username: user.username, password: user.password } })
            .then((response) => {
                setUserInfo({ name: user.username ?? "", id_role: "1", id_user: "1" });
                localStorage.setItem("token", response.data.token);
                navigate("/home");
            });
    }, [navigate]);

    const contextValue = useMemo(() => ({
        userInfo,
        logUser,
        setUserInfo,
        isLoggedIn,
        storeIsLoggedIn
    }), [userInfo, setUserInfo, logUser, isLoggedIn, storeIsLoggedIn]);

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