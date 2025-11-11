import { Module } from "@nestjs/common";
import { PrismaService } from "./config/prisma.service";
import { UsersModule } from "./users/users.module";
import { DealsModule } from "./deals/deals.module";
import { AccountsModule } from "./accounts/accounts.module";
import { ContactsModule } from "./contacts/contacts.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [UsersModule, DealsModule, AccountsModule, ContactsModule, TasksModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
