import { Router, Request, Response } from "express";

import { getAllUsers } from "../service";

const userRouter = Router();

const handleGetAllUsers = async (req: Request, res: Response) => {
    console.log(req);
    const result = await getAllUsers();
    res.send(result);
};

userRouter.get("/", handleGetAllUsers);

export default userRouter;
