import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => Int) id: number;

  @Field()
  type: string;
}

@ObjectType()
export class Lead {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  mobile: string;

  @Field()
  postcode: string;

  @Field(() => [Service])
  services: Service[];

  @Field()
  createdAt: Date;
}
