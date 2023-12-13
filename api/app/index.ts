import dotenv from "dotenv";
import { Response, Request } from "express";

import app from "./app";

dotenv.config();

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    console.log(req);
    res.status(200).send("Hello World!");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});