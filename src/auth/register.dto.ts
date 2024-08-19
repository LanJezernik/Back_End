import {IsEmail, IsNotEmpty} from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    ime: string;

    @IsNotEmpty()
    priimek: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    geslo: string;
}