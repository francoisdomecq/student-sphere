import { Knex } from "knex";

import database from "@student-sphere-infrastructure/database";
import { logger } from "@student-sphere-root/config";
import { Establishment } from "@student-sphere-root/scripts/import-establishments/types/establishment";
import { ESTABLISHMENTS_TABLE_NAME } from "@student-sphere-root/utils/table-names";

const findEstablishmentsByName = async (establishmentName: string | undefined): Promise<Establishment[]> => {
    try {
        return await database(ESTABLISHMENTS_TABLE_NAME)
            .select("establishment_id", "establishment_name", "establishment_postal_code", "establishment_city", "establishment_type")
            .modify((qb: Knex.QueryBuilder) => qb.whereILike("establishment_name", `%${establishmentName}%`));
    } catch (err) {
        logger.info(`Could not find establishment with name : ${establishmentName}`);
        throw err;
    }
};

export { findEstablishmentsByName };