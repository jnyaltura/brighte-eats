import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaClient) {}

  async createLead(input: RegisterInput) {
    const { name, email, mobile, postcode, services } = input;
    return this.prisma.lead.create({
      data: {
        name,
        email,
        mobile,
        postcode,
        services: {
          create: services.map((type) => ({ type })),
        },
      },
      include: {
        services: true,
      },
    });
  }

  findAll() {
    return this.prisma.lead.findMany({ include: { services: true } });
  }

  findOne(id: number) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: { services: true },
    });
  }
}
