import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    title?:string;

    @IsOptional()
    @IsString()
    content?:string;

    @IsOptional()
    @IsNumber()
    subject_id?:number;
}