import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { LeadsService } from './leads.service';
import { Lead } from './entities/lead.entity';
import { RegisterInput } from './dto/register.input';

@Resolver(() => Lead)
export class LeadsResolver {
  constructor(private readonly leadsService: LeadsService) {}

  @Query(() => [Lead])
  async leads(): Promise<Lead[]> {
    try {
      return await this.leadsService.findAll();
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw new Error('Failed to fetch leads');
    }
  }

  @Query(() => [Lead])
  async leadsWithPagination(@Args('page') page: number, @Args('limit') limit: number): Promise<Lead[]> {
    try {
      return await this.leadsService.findAndPagination(page, limit);
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw new Error('Failed to fetch leads');
    }
  }


  @Query(() => Lead)
  async lead(@Args('id') id: number): Promise<Lead | null> {
    try {
      return await this.leadsService.findOne(id);
    } catch (error) {
      console.error(`Error fetching lead with id ${id}:`, error);
      throw new Error('Lead not found or could not be retrieved');
    }
  }

  @Mutation(() => Lead)
  async register(@Args('input') input: RegisterInput): Promise<Lead> {
    try {
      return await this.leadsService.createLead(input);
    } catch (error) {
      console.error('Error registering lead:', error);
      throw new Error('Failed to register lead. Please check your input.');
    }
  }
}
