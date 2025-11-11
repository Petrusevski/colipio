import { Injectable } from "@nestjs/common";
import { PrismaService } from "../config/prisma.service";

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  listByOwner(ownerId: string) {
    return this.prisma.contact.findMany({
      where: { owner_id: ownerId },
      orderBy: { created_at: "desc" },
    });
  }

  createForOwner(ownerId: string, data: any) {
    return this.prisma.contact.create({
      data: {
        full_name: data.full_name,
        email: data.email ?? null,
        phone: data.phone ?? null,
        title: data.title ?? null,
        channel: data.channel ?? null,
        account_id: data.account_id ?? null,
        owner_id: ownerId,
      },
    });
  }
}
