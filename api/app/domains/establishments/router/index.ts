import { Request, Response, Router } from "express";

import { searchEstablishment } from "@student-sphere-domains/establishments/service";

const establishmentRouter = Router();

const handleGetEstablishments = async (req: Request, res: Response) => {
    console.log(req);
    const result = await searchEstablishment("CENTRE REGIONAL ASSOCIE AU CNAM, ANNEXE DE LYON");
    res.send(result);
};

establishmentRouter.get("/", handleGetEstablishments);

export { establishmentRouter };