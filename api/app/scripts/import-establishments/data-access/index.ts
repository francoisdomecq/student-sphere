import { Knex } from "knex";

import { setupTransaction } from "@student-sphere-infrastructure/database";
import { logger } from "@student-sphere-root/config";
import { EstablishmentDbRow } from "@student-sphere-root/scripts/import-establishments/types/establishment";

const ESTABLISHMENTS_TABLE_NAME = "establishments";

const insertEstablishments = async (establishments: Set<EstablishmentDbRow>, transaction: Knex.Transaction) => {
    const establishmentsToInsert = Array.from(establishments);
    try {
        await setupTransaction(ESTABLISHMENTS_TABLE_NAME, transaction)
            .insert(establishmentsToInsert)
            .onConflict([ "establishment_id" ])
            .merge([ "establishment_name", "establishment_type", "establishment_city_name", "establishment_postal_code" ]);
    } catch (err) {
        logger.info(err);
    }
};

export { insertEstablishments };