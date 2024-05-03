import { Response, Router } from "express";

import authenticationMiddleware from "@student-sphere-config/auth";
import { UserAuthBody, UserAuthQuery } from "@student-sphere-domains/user/validators";
import { SSRequest } from "@student-sphere-root/types";

import { createUser, getAllUsers, getUser } from "../service";

const userRouter = Router();

const handleGetAllUsers = async (_req: SSRequest, res: Response) => {
    const result = await getAllUsers();
    res.send(result);
};

const handleGetUser = async (req: SSRequest, res: Response) => {
    const { username, password } = new UserAuthQuery(req.query);
    const user = await getUser(username, password);
    res.send(user);
};

const handlePostUser = async (req: SSRequest, res: Response) => {
    const userAuth = new UserAuthBody(req.body);
    const response = await createUser(userAuth);
    res.send(response);
};

userRouter.get("/", authenticationMiddleware, handleGetAllUsers);
userRouter.get("/auth", handleGetUser);
userRouter.post("/auth", handlePostUser);

export default userRouter;
