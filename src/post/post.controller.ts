import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param, Patch,
    Post,
    Put,
    Req,
    UnauthorizedException,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {PostService} from "./post.service";
import {AuthGuard} from "../auth/auth.guard";
import {JwtService} from "@nestjs/jwt";
import {CreatePostDto} from "./create-post.dto";
import {Request} from 'express';
import {UpdatePostDto} from "./update-post.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {extname} from 'path';
import {RequestWithUser} from "../interfaces/auth.interface";
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Posti } from './post.entity';
import { GetCurrentUserId } from 'src/decorators/get-current-user-id.decorator';

//@UseGuards(AuthGuard)
@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {

    constructor(
        private postService:PostService,
        private jwtService: JwtService) {
    }

    @Get()
    getAll () {
        console.log('Uporabnik');
        console.log(GetCurrentUserId);
        return this.postService.getAll();

    }

    @Post()
    async create (
        @Body() data: CreatePostDto,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.postService.create({
            title: data.title,
            content: data.content,
            subject: {id: data.subject_id},
            user: {id: user.id}
        });
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './uploads',
            filename(_,file,callback) {
                return callback(null,file.originalname);
            }
        })
    }))
    /* uploadFile(@UploadedFile() file: Express.Multer.File) {
         console.log(file);
     }*/

    @Get(':id')
    getOne(@Param('id') id:number) {
        return this.postService.findOne(id);
    }

    @Delete(':id')
    async delete (
        @Param('id') id:number,
        @Req() request: Request) {

        const jwt = request.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.getOne(id);
        //preverim, če je lastnik
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik!');
        }

        return this.postService.delete(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch('edit/:id')
    @HttpCode(HttpStatus.OK)
    async update (
        @Param('id') id:string,
        @Body() data: UpdatePostDto,
    ) : Promise<Posti> {
        return this.postService.updatePost(id, data);
    }

    //@UseGuards(JwtAuthGuard)
    @Get('postinfo/:id')
    @HttpCode(HttpStatus.OK)
    async getPostData (
        @Param('id') id:string
    ){
        return this.postService.getPostData(id)
    }


}


