import { logger } from "../../config";

import { importEstablishments } from "./service";

importEstablishments().then(() => {
    logger.info("Successfully imported establishments");
    process.exit(0);
})
    .catch((err: unknown) => {
        logger.error(`Failed to import establishments, ${err}`);
        process.exit(1);
    });
