import { USER_TABLE_NAME } from "@student-sphere-root/utils/table-names";

import database from "../../../infrastructure/database";


const findAllUsers = async () => {
    const users = await database(USER_TABLE_NAME).select("*");
    console.log(users);
    return users;
};


export {
    findAllUsers
};
