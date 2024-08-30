import { IsString, MinLength } from "class-validator";

export class LoginUserDto {

    @IsString()
    @MinLength(1)
    name: string = "";

    @IsString()
    @MinLength(1)
    password: string = "";
}