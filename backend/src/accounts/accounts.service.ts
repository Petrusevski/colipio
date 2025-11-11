import { Injectable } from "@nestjs/common";
import { PrismaService } from "../config/prisma.service";

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  listByOwner(ownerId: string) {
    return this.prisma.account.findMany({
      where: { owner_id: ownerId },
      orderBy: { created_at: "desc" },
    });
  }

  createForOwner(ownerId: string, data: any) {
    return this.prisma.account.create({
      data: {
        name: data.name,
        industry: data.industry ?? null,
        website: data.website ?? null,
        owner_id: ownerId,
      },
    });
  }
}
