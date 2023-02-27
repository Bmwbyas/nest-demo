import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PostsService } from "./posts.service";
import { CurrentPost } from "./posts.model";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("posts")
@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {
  }

  @ApiOperation({ summary: "create new Post" })
  @ApiResponse({ status: 200, type: Post })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createPost(@Body() dto: CreatePostDto,
                   @UploadedFile() image): Promise<CurrentPost> {

    return this.postService.createPost(dto, image);
  }

}
