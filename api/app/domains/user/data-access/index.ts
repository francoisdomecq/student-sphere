import { logger } from "../../../config";
import database from "../../../infrastructure/database";
import { EstablishmentDbRow } from "../../../scripts/import-establishments/types/establishment";

const USER_TABLE_NAME = "users";

const findAllUsers = async () => {
    const users = await database(USER_TABLE_NAME).select("*");
    console.log(users);
    return users;
};

const ESTABLISHMENTS_TABLE_NAME = "establishments";

const insertEstablishments = async (establishments: EstablishmentDbRow[]) => {
    try {
        await database(ESTABLISHMENTS_TABLE_NAME).insert(establishments);
    } catch (err) {
        logger.info(err);
    }
};

export { insertEstablishments };

export {
    findAllUsers
};
