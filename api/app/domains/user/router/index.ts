import { Response, Router } from "express";

import { SSRequest } from "@student-sphere-root/types";

import { getAllUsers } from "../service";

const userRouter = Router();

const handleGetAllUsers = async (_req: SSRequest, res: Response) => {
    const result = await getAllUsers();
    res.send(result);
};

userRouter.get("/", handleGetAllUsers);

export default userRouter;
