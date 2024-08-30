/*import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}*/

import { IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    
    @IsString()
    @MinLength(1)
    name: string = "";

    @IsString()
    @MinLength(1)
    password: string = "";
}
