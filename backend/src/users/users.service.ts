import { Injectable } from "@nestjs/common";
import { PrismaService } from "../config/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateByAuthId(authId: string, email?: string) {
    let user = await this.prisma.user.findUnique({ where: { auth_id: authId } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          auth_id: authId,
          email: email || "",
        },
      });
    }
    return user;
  }
}
