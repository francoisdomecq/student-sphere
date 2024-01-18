import { Request, Response } from "express";

import app from "./app";
import { logger } from "./config";

const port = process.env.PORT ?? 3002;

app.get("/", (req: Request, res: Response) => {
    logger.info("Hello World!", req);
    res.status(200).send("Hello World!");
});

app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
});
