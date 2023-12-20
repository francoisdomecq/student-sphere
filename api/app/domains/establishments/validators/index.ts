import { IsOptional, IsString } from "class-validator";

class EstablishmentQuery {
    constructor(data: Record<string, unknown>) {
        Object.assign(this, data);
    }

    @IsString()
    @IsOptional()
        search?: string;
}

export { EstablishmentQuery };