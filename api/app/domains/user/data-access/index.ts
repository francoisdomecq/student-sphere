import { AuthUser } from "@student-sphere-domains/user/types/user";
import { USER_TABLE_NAME } from "@student-sphere-root/utils/table-names";

import database from "../../../infrastructure/database";


const findAllUsers = async () => {
    return database(USER_TABLE_NAME).select("*");
};

const findUser = async (email: string): Promise<AuthUser> => {
    return database(USER_TABLE_NAME)
        .select("email", "password")
        .orWhere("email", email)
        .first();
};

const insertUser = async (user: AuthUser) => {
    const userToInsert = { email: user.username, password: user.password };
    return database(USER_TABLE_NAME).insert(userToInsert);
};


export {
    findAllUsers,
    findUser,
    insertUser
};
 