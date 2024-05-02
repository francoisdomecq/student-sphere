import { compare, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

import { StudentSphereUser } from "@student-sphere-domains/user/types/user";
import { UserAuthBody } from "@student-sphere-domains/user/validators";

import { findAllUsers, findUser, insertUser } from "../data-access";

const getAllUsers = async () => {
    return findAllUsers();
};

const getUser = async (username: string, password: string) => {
    const foundUser = await findUser(username);
    const isUserAuthenticated = await compare(password, foundUser.password);
    if (isUserAuthenticated) {
        const tokenSecret = process.env.JWT_PRIVATE_KEY ?? "default_secret";
        return { ...foundUser, token : sign({ username:username },tokenSecret,{ expiresIn:"12h" }) };
    }
    return null;
};

const createUser = async (userAuth:UserAuthBody) => {
    const encryptedPassword = hashSync(userAuth.password, 10);
    const userToCreate: StudentSphereUser = { ...userAuth, password: encryptedPassword, idRole: "1" };
    return insertUser(userToCreate);
};

export {
    getAllUsers,
    getUser,
    createUser
};
 