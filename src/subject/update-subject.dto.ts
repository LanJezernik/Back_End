import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateSubjectDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?:string;
}