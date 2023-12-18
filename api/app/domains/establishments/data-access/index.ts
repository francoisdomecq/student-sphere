import database from "@student-sphere-infrastructure/database";
import { logger } from "@student-sphere-root/config";
import { Establishment } from "@student-sphere-root/scripts/import-establishments/types/establishment";
import { ESTABLISHMENTS_TABLE_NAME } from "@student-sphere-root/utils/table-names";

const findEstablishmentByName = async (establishmentName: string): Promise<Establishment> => {
    try {
        return await database(ESTABLISHMENTS_TABLE_NAME)
            .select()
            .whereILike("establishment_name", establishmentName)
            .first();
    } catch (err) {
        logger.info(`Could not find establishment with name : ${establishmentName}`);
        throw err;
    }
};

export { findEstablishmentByName };