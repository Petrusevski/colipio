import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../config/prisma.service";

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  listByOwner(ownerId: string) {
    return this.prisma.deal.findMany({
      where: { owner_id: ownerId },
      orderBy: { created_at: "desc" },
    });
  }

  createForOwner(ownerId: string, data: any) {
    return this.prisma.deal.create({
      data: {
        title: data.title,
        stage: data.stage ?? "New",
        value: data.value ?? null,
        currency: data.currency ?? "EUR",
        owner_id: ownerId,
        account_id: data.account_id ?? null,
        contact_id: data.contact_id ?? null,
        source: data.source ?? null,
      },
    });
  }

  async updateForOwner(ownerId: string, id: string, data: any) {
    const existing = await this.prisma.deal.findUnique({ where: { id } });
    if (!existing || existing.owner_id !== ownerId) {
      throw new ForbiddenException("Not allowed");
    }
    return this.prisma.deal.update({
      where: { id },
      data,
    });
  }
}
