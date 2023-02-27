import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.model";
import { CurrentPost } from "./posts.model";
import { UploadFileModule } from "../upload-file/upload-file.module";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports:[
    SequelizeModule.forFeature([User,CurrentPost]),
    UploadFileModule
  ],
})
export class PostsModule {}
