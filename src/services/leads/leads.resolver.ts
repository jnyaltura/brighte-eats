import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LeadsService } from './leads.service';
import { RegisterInput } from './dto/register.input';
import { Lead } from './entities/lead.entity';

@Resolver(() => Lead)
export class LeadsResolver {
  constructor(private readonly leadsService: LeadsService) {}

  @Mutation(() => Lead)
  register(@Args('input') input: RegisterInput) {
    return this.leadsService.createLead(input);
  }

  @Query(() => [Lead])
  leads() {
    return this.leadsService.findAll();
  }

  @Query(() => Lead)
  lead(@Args('id', { type: () => Int }) id: number) {
    return this.leadsService.findOne(id);
  }
}
