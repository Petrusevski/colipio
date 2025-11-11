import { Body, Controller, Get, Post, Put, Param, UseGuards } from "@nestjs/common";
import { DealsService } from "./deals.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/user.decorator";

@Controller("deals")
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@CurrentUser() user: any) {
    return this.dealsService.listByOwner(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: any, @Body() body: any) {
    return this.dealsService.createForOwner(user.sub, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async updateStage(@CurrentUser() user: any, @Param("id") id: string, @Body() body: any) {
    return this.dealsService.updateForOwner(user.sub, id, body);
  }
}
