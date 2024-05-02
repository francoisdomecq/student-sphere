import type { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { SSRequest } from "@student-sphere-root/types";

const authenticationMiddleware = (req: SSRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token){
            const tokenSecret = process.env.JWT_PRIVATE_KEY ?? "default_secret";
            const decodedToken = verify(token, tokenSecret);
            req.user = (decodedToken as any).username;
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(401).send({ message: "Unauthorized" });
    }
};

export default authenticationMiddleware;