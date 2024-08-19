import {IsNotEmpty, IsString} from "class-validator";

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description:string;
}