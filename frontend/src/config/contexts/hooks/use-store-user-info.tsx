import { useCallback } from "react";

import { UserInfos } from "../../../domains/user/types";


const useStoreUserInfo = () => {

    const getIsLoggedIn = () => {
        const isLoggedIn = localStorage.getItem("is-logged-in");
        return !!isLoggedIn;
    };

    const storeIsLoggedIn = () => {
        localStorage.setItem("is-logged-in", "true");
    };

    const getLocalUserInfo = () => {
        const localUserInfo = localStorage.getItem("user-info");
        if (localUserInfo) {
            return JSON.parse(localUserInfo);
        }
        return null;
    };

    const storeLocalUserInfo = useCallback((userInfo: UserInfos) => {
        localStorage.setItem("user-info", JSON.stringify(userInfo));
    }, []);

    return { getLocalUserInfo, storeLocalUserInfo, storeIsLoggedIn, getIsLoggedIn };
};

export default useStoreUserInfo;
