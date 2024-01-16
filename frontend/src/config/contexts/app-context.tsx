import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useDebounceValue from "../../domains/core/hooks/use-debounce-value.tsx";
import { UserInfos } from "../../domains/user/types";
import axiosClient from "../axios";

import useStoreUserInfo from "./hooks/use-store-user-info.tsx";

interface AppContextProps {
    children: React.ReactNode
}

interface AppContextInterface {
    userInfo: UserInfos;
    setUserInfo: (value: UserInfos) => void;
    setAccessToken: (value: string) => void;
    getAccessToken: () => string;
    isLoggedIn: boolean;
    storeIsLoggedIn: () => void;
}

const AppContext = React.createContext <(AppContextInterface)>({} as AppContextInterface);

const AppContextProvider = ({ children }: AppContextProps) => {
    const { getLocalUserInfo, storeLocalUserInfo, storeIsLoggedIn, getIsLoggedIn } = useStoreUserInfo();
    const navigate = useNavigate();
    const accessToken = useRef<string>("");
    const [isLoggedIn] = useState<boolean>(getIsLoggedIn());
    const [userInfo, setUserInfo] = useState<UserInfos>(getLocalUserInfo());
    const debouncedSearchValue = useDebounceValue(userInfo);
    const getAccessToken = () => accessToken.current;

    const initUserInfo = useCallback((userInfos: UserInfos) => {
        setUserInfo(userInfos);
        storeLocalUserInfo(userInfos);
    }, [storeLocalUserInfo]);


    const refreshUserInfo = useCallback(() => {
        if (accessToken.current) {
            axiosClient.get("/user").then((res) => {
                if (JSON.stringify(res.data) !== JSON.stringify(debouncedSearchValue)) {
                    const requestedUserInfo = res.data;
                    if (!requestedUserInfo) {
                        navigate("/no-access");
                    } else {
                        initUserInfo(requestedUserInfo);
                    }
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    navigate("/no-access");
                }
                console.error(err);
            });
        }
    }, [navigate, debouncedSearchValue]);

    const setAccessToken = useCallback((value: string) => {
        accessToken.current = value;
        axiosClient.defaults.headers.common["Authorization"] = value;
        refreshUserInfo();
    }, [refreshUserInfo]);

    useEffect(refreshUserInfo, [refreshUserInfo]);

    const contextValue = useMemo(() => ({
        userInfo,
        setAccessToken,
        getAccessToken,
        setUserInfo,
        isLoggedIn,
        storeIsLoggedIn
    }), [userInfo, setUserInfo, setAccessToken, isLoggedIn, storeIsLoggedIn]);

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