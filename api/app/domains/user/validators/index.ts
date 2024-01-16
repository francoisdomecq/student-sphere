import { IsNotEmpty, IsString } from "class-validator";

class UserAuthQuery {
    constructor(data: Record<string, unknown>) {
        Object.assign(this, data);
    }

  @IsString()
  @IsNotEmpty()
      username!: string;

  @IsString()
  @IsNotEmpty()
      password!: string;
}

export { UserAuthQuery };