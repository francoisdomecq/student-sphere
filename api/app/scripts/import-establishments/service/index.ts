import { randomUUID } from "crypto";
import * as fs from "fs";
import path from "path";

import { parse } from "csv-parse";

import { insertEstablishments } from "../../../domains/user/data-access";
import { Establishment, EstablishmentDbRow } from "../types/establishment";

const ESTABLISHMENTS_COLUMNS = [ undefined, undefined, undefined, "establishmentName", undefined, undefined, undefined, undefined, undefined, "establishmentType", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "establishmentPostalCode", "establishmentCity", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ];
const ESTABLISHMENTS_FILE_NAME = "fr-esr-implantations_etablissements_d_enseignement_superieur_publics.csv";
const ESTABLISHMENTS_FILE_PATH = `app/scripts/import-establishments/file/${ESTABLISHMENTS_FILE_NAME}`;

const establishmentParser = parse({
    delimiter: ";",
    bom: true,
    quote: "\"",
    columns: ESTABLISHMENTS_COLUMNS
});

const parseEstablishmentsRow = (establishment: Establishment): EstablishmentDbRow => {
    const { establishmentName, establishmentType, establishmentPostalCode, establishmentCity } = establishment;
    return {
        id: randomUUID(),
        establishment_name: establishmentName,
        establishment_type: establishmentType,
        establishment_city_name: establishmentCity,
        establishment_postal_code: establishmentPostalCode
    };
};

const parseEstablishments = async (stream: fs.ReadStream) => {
    const establishmentsChunk: EstablishmentDbRow[] = [];
    for await (const establishment of stream.pipe(establishmentParser)) {
        const parsedEstablishmentDbRow = parseEstablishmentsRow(establishment);
        establishmentsChunk.push(parsedEstablishmentDbRow);
    }
    await insertEstablishments(establishmentsChunk);
};

const importEstablishments = async () => {
    const stream = fs.createReadStream(path.resolve(ESTABLISHMENTS_FILE_PATH));
    try {
        await parseEstablishments(stream);
    } catch (err) {
        console.error(err);
    }
};

export {
    importEstablishments
};
