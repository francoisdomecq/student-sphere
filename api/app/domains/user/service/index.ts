import { compare } from "bcrypt";

import { findAllUsers, findUser } from "../data-access";

const getAllUsers = async () => {
    return findAllUsers();
};

const getUser = async (username: string, password: string) => {
    const foundUser = await findUser(username);
    const isUserAutenticated = await compare(password, foundUser.password);

    if (isUserAutenticated) {
        return foundUser;
    }
    return null;
};

export {
    getAllUsers,
    getUser
};
