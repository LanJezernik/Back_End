import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Posti} from "./post.entity";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([Posti]),
      CommonModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
