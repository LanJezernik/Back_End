import {BadRequestException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Posti} from "./post.entity";
import {Repository} from "typeorm";
import {UpdatePostDto} from "./update-post.dto";
import {AbstractService} from "../common/abstract.service";
import {PostgresErrorCode} from "../helpers/postgresErrorCode.enum";

@Injectable()
export class PostService extends AbstractService{
    constructor(
        @InjectRepository(Posti) private readonly postRepository: Repository<Posti>
    ) {
        super(postRepository);
    }

    getAll(): Promise<Posti[]> {
        return this.postRepository.find();
    }

    create(data): Promise<Posti> {
        return this.postRepository.save(data);
    }

    findOne(id:number): Promise<Posti> {
        return this.postRepository.findOne({id});
    }

    async updatePost(
        id:string,
        updatePostDto:UpdatePostDto
    ): Promise<Posti> {
        const post = (await this.findById(id)) as Posti;
        console.log(post.id);
        try {
            console.log('test');
            post.content = updatePostDto.content;
            post.title = updatePostDto.title;
            return this.postRepository.save(post);
        } catch (error) {
            console.log(error);
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new BadRequestException('The same quote already exists.');
            }
            throw new InternalServerErrorException(
                'Something went wrong while updating the quote.',
            );
        }

        // await this.postRepository.update(id,data);
        // return this.findOne(id);
    }

    delete(id:number) {
        return this.postRepository.delete({id});
    }

    async getPostData(id: string): Promise<Posti> {
        const dataSql = await this.postRepository.query(
        `SELECT title, content
           FROM "posts" 
          WHERE id = '${id}'
          ;`,
        );
        return dataSql;
    }
}
