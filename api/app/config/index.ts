import bodyParser from "body-parser";
import cors from "cors";
import type express from "express";

import logger from "./logger";

const env = process.env.NODE_ENV;

const injectConfig = (app: express.Application) => {

    // Remove X Powered By Header
    app.disable("x-powered-by");

    // Parse entries
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Allow cors for localhost if environment is not production
    if (env === "local") {
        app.use(cors({ origin: process.env.AUTHORIZED_CORS_ORIGIN, credentials: true }));
    }
};

// Allow cors for localhost if environment is not production

export { injectConfig, logger };
