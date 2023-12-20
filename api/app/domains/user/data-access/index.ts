import { USER_TABLE_NAME } from "@student-sphere-root/utils/table-names";

import database from "../../../infrastructure/database";


const findAllUsers = async () => {
    return database(USER_TABLE_NAME).select("*");
};


export {
    findAllUsers
};
