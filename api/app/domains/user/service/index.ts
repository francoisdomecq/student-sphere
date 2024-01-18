import { compare, hashSync } from "bcrypt";

import { AuthUser } from "@student-sphere-domains/user/types/user";

import { findAllUsers, findUser, insertUser } from "../data-access";

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

const createUser = async (username: string, password: string) => {
    const encryptedPassword = hashSync(password, 10);
    const userToCreate: AuthUser = { username, password: encryptedPassword };
    return insertUser(userToCreate);
};

export {
    getAllUsers,
    getUser,
    createUser
};
 