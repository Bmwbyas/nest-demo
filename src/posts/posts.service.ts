import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CurrentPost } from "./posts.model";
import { CreatePostDto } from "./dto/create-post.dto";
import { UploadFileService } from "../upload-file/upload-file.service";

@Injectable()
export class PostsService {
  constructor(@InjectModel(CurrentPost)
              private postRepository: typeof CurrentPost,
              private uploadFileService:UploadFileService
  ) {}
  async createPost(dto:CreatePostDto,image:string):Promise<CurrentPost>{
    const fileName= await this.uploadFileService.createFile(image)
    const post= await this.postRepository.create({...dto,image:fileName})

    return post
  }

}
