import type { Knex } from "knex";

import { database } from "./init";

const setupTransaction = (tableName: string, transaction?: Knex.Transaction): Knex.QueryBuilder => {
    if (transaction) {
        return transaction(tableName);
    }
    return database(tableName);
};

export { setupTransaction };
