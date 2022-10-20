import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import PostsService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';

@Controller('posts')
export default class PostsController {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    private readonly postsService: PostsService
  ) { }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    this.logger.log(`create Post from POST MODULE SERVICE --- `, post);
    return this.postsService.createPost(post);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
