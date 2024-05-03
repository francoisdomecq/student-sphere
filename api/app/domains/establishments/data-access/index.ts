import { camelKeys } from "js-convert-case";
import { Knex } from "knex";

import database from "@student-sphere-infrastructure/database";
import { logger } from "@student-sphere-root/config";
import {
    Establishment,
    EstablishmentDbRow
} from "@student-sphere-root/scripts/import-establishments/types/establishment";
import { ESTABLISHMENTS_TABLE_NAME } from "@student-sphere-root/utils/table-names";

const findEstablishmentsByName = async (establishmentName: string | undefined): Promise<Establishment[]> => {
    try {
        const establishmentsDbRow: EstablishmentDbRow[] = await database(ESTABLISHMENTS_TABLE_NAME)
            .select("establishment_id", "establishment_name", "establishment_postal_code", "establishment_city_name", "establishment_type")
            .modify((qb: Knex.QueryBuilder) => {
                if (establishmentName) {
                    qb.whereILike("establishment_name", `%${establishmentName}%`);
                }
            });
        return establishmentsDbRow.map((establishmentDbRow: EstablishmentDbRow) => <Establishment>camelKeys(establishmentDbRow));
    } catch (err) {
        logger.info(`Could not find establishment with name : ${establishmentName}`);
        throw err;
    }
};

const findEstablishmentById = async (establishmentId: string | undefined): Promise<Establishment> => {
    try {
        const establishmentDbRow: EstablishmentDbRow = await database(ESTABLISHMENTS_TABLE_NAME)
            .select("establishment_id", "establishment_name", "establishment_postal_code", "establishment_city_name", "establishment_type")
            .where("establishment_id", establishmentId)
            .first();
        return <Establishment>camelKeys(establishmentDbRow);
    } catch (err) {
        logger.info(`Could not find establishment with id : ${establishmentId}`);
        throw err;
    }
};

export { findEstablishmentsByName, findEstablishmentById };