import { USER_TABLE_NAME } from "@student-sphere-root/utils/table-names";

import database from "../../../infrastructure/database";


const findAllUsers = async () => {
    return database(USER_TABLE_NAME).select("*");
};

const findUser = async (username: string) => {
    return database(USER_TABLE_NAME)
        .select("username", "email", "password")
        .where("username", username)
        .orWhere("email", username)
        .first();
};


export {
    findAllUsers,
    findUser
};
 