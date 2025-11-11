import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../config/prisma.service";

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  listByUser(userId: string) {
    return this.prisma.task.findMany({
      where: { assigned_to: userId },
      orderBy: { created_at: "desc" },
    });
  }

  createForUser(userId: string, data: any) {
    return this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        status: data.status ?? "pending",
        due_date: data.due_date ? new Date(data.due_date) : null,
        deal_id: data.deal_id ?? null,
        assigned_to: userId,
      },
    });
  }

  async updateForUser(userId: string, id: string, data: any) {
    const existing = await this.prisma.task.findUnique({ where: { id } });
    if (!existing || existing.assigned_to !== userId) {
      throw new ForbiddenException("Not allowed");
    }
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }
}
