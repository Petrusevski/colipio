import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/user.decorator";

@Controller("contacts")
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@CurrentUser() user: any) {
    return this.contactsService.listByOwner(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: any, @Body() body: any) {
    return this.contactsService.createForOwner(user.sub, body);
  }
}
