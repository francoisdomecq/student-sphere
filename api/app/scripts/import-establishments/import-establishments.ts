import { logger } from "../../config";

import { importEstablishments } from "./service";

importEstablishments().then(() => {
    logger.info("Successfully imported chroneo absence");
    process.exit(0);
})
    .catch((err: unknown) => {
        logger.error(`Failed to import chroneo absences, ${err}`);
        process.exit(1);
    });
