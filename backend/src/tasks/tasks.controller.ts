import { Body, Controller, Get, Post, Put, Param, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/user.decorator";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@CurrentUser() user: any) {
    return this.tasksService.listByUser(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: any, @Body() body: any) {
    return this.tasksService.createForUser(user.sub, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(@CurrentUser() user: any, @Param("id") id: string, @Body() body: any) {
    return this.tasksService.updateForUser(user.sub, id, body);
  }
}
