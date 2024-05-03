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

class UserAuthBody {
    constructor(data: Record<string, unknown>) {
        Object.assign(this, data);
    }

  @IsString()
  @IsNotEmpty()
      username!: string;

  @IsString()
  @IsNotEmpty()
      email!: string;
  
  @IsString()
  @IsNotEmpty()
      password!: string;

  @IsString()
  @IsNotEmpty()
      firstName!: string;

  @IsString()
  @IsNotEmpty()
      lastName!: string;

  @IsString()
  @IsNotEmpty()
      establishmentId!: string;
}

export { UserAuthQuery ,UserAuthBody };