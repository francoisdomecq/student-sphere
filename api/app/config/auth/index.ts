import type { NextFunction, Response } from "express";

import { SSRequest } from "@student-sphere-root/types";

const authenticationMiddleware = async (_req: SSRequest, _res: Response, next: NextFunction) => {
    next();
};

export default authenticationMiddleware;