import express from "express";

import { establishmentRouter } from "@student-sphere-domains/establishments/router";

import { injectConfig } from "./config";
import userRouter from "./domains/user/router";

const app = express();

injectConfig(app);

app.use("/api/user", userRouter);
app.use("/api/establishment", establishmentRouter);

export default app;
