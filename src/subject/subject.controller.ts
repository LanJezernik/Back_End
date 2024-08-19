import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import {SubjectService} from "./subject.service";
import {CreateSubjectDto} from "./create-subject.dto";
import {UpdateSubjectDto} from "./update-subject.dto";


@Controller('subject')
export class SubjectController {
    constructor(private subjectService: SubjectService) {
    }

    @Get()
    getAll() {
        return this.subjectService.getAll();
    }

    @Post()
    create(@Body() data: CreateSubjectDto) {
        return this.subjectService.create(data);
    }

    @Get(':id')
    getSubjectById(@Param('id') id: number) {
        return this.subjectService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id:number,
        @Body() data : UpdateSubjectDto
    )  {
        return await this.subjectService.update(id,data);
    }

    @Delete(':id')
    delete(@Param('id') id:number) {
        return this.subjectService.delete(id);
    }
}
