import * as fs from "fs";
import path from "path";

import { parse } from "csv-parse";

import { logger } from "../../../config";

logger.info("STARTED");
const ESTABLISHMENTS_COLUMNS = [ undefined, undefined, undefined, "establishmentName", undefined, undefined, undefined, undefined, undefined, "establishmentType", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "establishmentPostalCode", "establishmentCity", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined ];
const ESTABLISHMENTS_FILE_NAME = "fr-esr-implantations_etablissements_d_enseignement_superieur_publics.csv";
const ESTABLISMENTS_FILE_PATH = `app/scripts/import-establishments/${ESTABLISHMENTS_FILE_NAME}`;

const establishmentParser = parse({
    delimiter: ";",
    bom: true,
    quote: "\"",
    columns: ESTABLISHMENTS_COLUMNS
});
const parseDara = async (stream: fs.ReadStream) => {
    console.log(establishmentParser);
    for await  (const chunk of stream) {
        console.log(chunk);
    }
};

const importEstablishments = async () => {
    const stream = fs.createReadStream(path.resolve(ESTABLISMENTS_FILE_PATH));
    try {
        await parseDara(stream);
    } catch (err) {
        console.error(err);
    }
};

export {
    importEstablishments
};
