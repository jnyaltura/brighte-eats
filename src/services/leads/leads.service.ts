import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterInput } from './dto/register.input';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaClient) {}

  async createLead(input: RegisterInput):Promise<any> {
    const { name, email, mobile, postcode, services } = input;
    return await this.prisma.lead.create({
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

  async findAll():Promise<Lead[]> {
    return await this.prisma.lead.findMany({ include: { services: true } });
  }

  async findOne(id: number):Promise<Lead|null> {
    return await this.prisma.lead.findUnique({
      where: { id },
      include: { services: true },
    });
  }
}
