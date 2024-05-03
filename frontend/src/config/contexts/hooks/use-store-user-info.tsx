import { UserInfos } from "../../../domains/user/types";


const useStoreUserInfo = () => {

    const getLocalUserInfo = () => {
        const localUserInfo = localStorage.getItem("user");
        if (localUserInfo) {
            return JSON.parse(localUserInfo)?.user;
        }
        return null;
    };

    const storeLocalUserInfo = (userInfo: UserInfos, token: string) => {
        localStorage.setItem("user", JSON.stringify({ user: userInfo, token }));
    };

    return { getLocalUserInfo, storeLocalUserInfo };
};

export default useStoreUserInfo;
