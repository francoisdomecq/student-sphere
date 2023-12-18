import database from "../../../infrastructure/database";

const USER_TABLE_NAME = "users";

const findAllUsers = async () => {
    const users = await database(USER_TABLE_NAME).select("*");
    console.log(users);
    return users;
};


export {
    findAllUsers
};
