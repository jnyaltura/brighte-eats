import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsResolver } from './leads.resolver';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [LeadsResolver, LeadsService, PrismaClient],
})
export class LeadsModule {}
