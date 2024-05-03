import { camelKeys } from "js-convert-case";

import { StudentSphereUser, StudentSphereUserDbRow } from "@student-sphere-domains/user/types/user";
import { USER_TABLE_NAME } from "@student-sphere-root/utils/table-names";

import database from "../../../infrastructure/database";

const findAllUsers = async (): Promise<StudentSphereUser> => {
    return database(USER_TABLE_NAME).select("email");
};

const findUser = async (email: string): Promise<StudentSphereUser> => {
    const userDbRow: StudentSphereUserDbRow = await database(USER_TABLE_NAME)
        .select("email", "password", "username", "establishment_id", "first_name", "last_name")
        .where("email", email)
        .first();
    return <StudentSphereUser>camelKeys(userDbRow);
};

const insertUser = async (user: StudentSphereUser) => {
    const userToInsert = {
        email: user.email,
        username: user.username,
        password: user.password,
        establishment_id: user.establishmentId,
        first_name: user.firstName,
        last_name: user.lastName
    };
    return database(USER_TABLE_NAME).insert(userToInsert);
};


export {
    findAllUsers,
    findUser,
    insertUser
};
 