import * as fs from "fs";
import path from "path";

import { parse } from "csv-parse";
import { Knex } from "knex";

import database from "@student-sphere-infrastructure/database";
import { logger } from "@student-sphere-root/config";
import { insertEstablishments } from "@student-sphere-root/scripts/import-establishments/data-access";

import { Establishment, EstablishmentDbRow } from "../types/establishment";

const CHUNK_SIZE = 1000;

const ESTABLISHMENTS_COLUMNS = [ undefined, undefined, undefined, "establishmentName", undefined, undefined, undefined, undefined, undefined, "establishmentType", "establishmentId", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "establishmentPostalCode", "establishmentCity", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ];
const ESTABLISHMENTS_FILE_NAME = "fr-esr-implantations_etablissements_d_enseignement_superieur_publics.csv";
const ESTABLISHMENTS_FILE_PATH = `app/scripts/import-establishments/file/${ESTABLISHMENTS_FILE_NAME}`;

const establishmentParser = parse({
    delimiter: ";",
    bom: true,
    quote: "\"",
    columns: ESTABLISHMENTS_COLUMNS,
    from: 2
});

const parseEstablishmentsRow = (establishment: Establishment): EstablishmentDbRow | undefined => {
    const {
        establishmentName,
        establishmentType,
        establishmentPostalCode,
        establishmentCity,
        establishmentId
    } = establishment;
    if (!establishmentName || !establishmentPostalCode) {
        return undefined;
    }
    return {
        establishment_id: establishmentId, establishment_name: establishmentName, establishment_type: establishmentType,
        establishment_city_name: establishmentCity, establishment_postal_code: establishmentPostalCode
    };
};

const parseEstablishments = async (stream: fs.ReadStream, transaction: Knex.Transaction) => {
    const establishmentsChunk: Set<EstablishmentDbRow> = new Set();
    for await (const establishment of stream.pipe(establishmentParser)) {
        const parsedEstablishmentDbRow = parseEstablishmentsRow(establishment);
        const isValidForInsert = parsedEstablishmentDbRow && establishmentsChunk.size >= CHUNK_SIZE;
        if (isValidForInsert) {
            await insertEstablishments(establishmentsChunk, transaction);
            establishmentsChunk.clear();
            establishmentsChunk.add(parsedEstablishmentDbRow);
        } else if (parsedEstablishmentDbRow && !establishmentsChunk.has(parsedEstablishmentDbRow)) {
            establishmentsChunk.add(parsedEstablishmentDbRow);
        }
    }
    if (establishmentsChunk.size > 0) {
        await insertEstablishments(establishmentsChunk, transaction);
    }
};

const importEstablishments = async () => {
    const transaction = await database.transaction();
    const stream = fs.createReadStream(path.resolve(ESTABLISHMENTS_FILE_PATH));
    try {
        await parseEstablishments(stream, transaction);
        await transaction.commit();
    } catch (err) {
        await transaction.rollback();
        logger.error(err);
        throw err;
    }
};

export {
    parseEstablishmentsRow,
    importEstablishments
};
