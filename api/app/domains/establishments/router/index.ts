import { Response, Router } from "express";

import authenticationMiddleware from "@student-sphere-config/auth";
import { searchEstablishmentById, searchEstablishments } from "@student-sphere-domains/establishments/service";
import { EstablishmentQuery } from "@student-sphere-domains/establishments/validators";
import type { SSRequest } from "@student-sphere-root/types";

const establishmentRouter = Router();

const handleGetEstablishments = async (req: SSRequest, res: Response) => {
    const establishmentQuery = new EstablishmentQuery(req.query);
    const result = await searchEstablishments(establishmentQuery.search);
    res.send(result);
};

const handleGetEstablishmentById = async (req: SSRequest, res: Response) => {
    const establishmentId = req?.user?.establishmentId;
    const result = await searchEstablishmentById(establishmentId);
    res.send(result);
};

establishmentRouter.get("/", handleGetEstablishments);
establishmentRouter.get("/:id", authenticationMiddleware, handleGetEstablishmentById);
export { establishmentRouter };