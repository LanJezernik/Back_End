import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Subject} from "./subject.entity";
import {Repository} from "typeorm";

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject) private readonly subjectRepositiry: Repository<Subject>
    ) {
    }

    getAll(): Promise<Subject[]> {
        return this.subjectRepositiry.find();
    }

    findOne(id:number): Promise<Subject> {
        return this.subjectRepositiry.findOne(id);
    }

    create(data): Promise<Subject> {
        return this.subjectRepositiry.save(data);
    }

    delete(id:number) {
        this.subjectRepositiry.delete({id});
    }

    async update(id:number, data): Promise<Subject> {
        await this.subjectRepositiry.update(id, data);
        return this.findOne(id);
    }
}
