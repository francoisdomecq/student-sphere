import { Request } from "express";

import { StudentSphereUser } from "@student-sphere-domains/user/types/user";

export interface SSRequest extends Request {
    user?: StudentSphereUser
}

