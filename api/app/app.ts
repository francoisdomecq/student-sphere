import express from "express";

import { injectConfig } from "./config";
import userRouter from "./domains/user/router";

const app = express();

injectConfig(app);

app.use("/api/user", userRouter);
export default app;
