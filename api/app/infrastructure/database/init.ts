import { Knex, knex } from "knex";
import pg from "pg";

import { logger } from "../../config";

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => {
    return parseFloat(value);
});

const env = process.env.NODE_ENV;
logger.info(`Bienvenue ENV : ${env}`);
logger.info(`Postgres Secure Connection : ${env !== "local"}`);

const dbConnection: Knex.PgConnectionConfig = {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
};

if (env !== "local") {
    dbConnection.ssl = true;
}

const database = knex({
    client: "pg",
    connection: dbConnection,
    pool: { min: 2, max: 6 },
    debug: process.env.LOG_LEVEL === "debug"
});

database.raw("SELECT 1").then(() => {
    logger.info("Student-sphere PG: Database connected");
}).catch((e: unknown) => {
    logger.info("Student-sphere PG: Database not connected");
    console.log(e);
});

export { database };
