import { AuthUser, StudentSphereUser } from "@student-sphere-domains/user/types/user";
import { USER_TABLE_NAME } from "@student-sphere-root/utils/table-names";

import database from "../../../infrastructure/database";

const findAllUsers = async ():Promise<StudentSphereUser> => {
    return database(USER_TABLE_NAME).select("email");
};

const findUser = async (email: string): Promise<AuthUser> => {
    return database(USER_TABLE_NAME)
        .select("email", "password")
        .where("email", email)
        .first();
};

const insertUser = async (user: StudentSphereUser) => {
    const userToInsert = { email: user.email,username:user.username, password: user.password,establishment_id:user.establishmentId, first_name: user.firstName, last_name: user.lastName };
    return database(USER_TABLE_NAME).insert(userToInsert);
};


export {
    findAllUsers,
    findUser,
    insertUser
};
 