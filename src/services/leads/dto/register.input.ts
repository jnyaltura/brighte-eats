import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsMobilePhone,
  IsPostalCode,
  Length,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field()
  @IsMobilePhone('en-PH', {}, { message: 'Invalid mobile number' })
  mobile: string;

  @Field()
  @IsPostalCode('any', { message: 'Invalid postcode' })
  postcode: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one service must be selected' })
  @IsIn(['delivery', 'pick-up', 'payment'], {
    each: true,
    message: 'Service must be one of delivery, pick-up, or payment',
  })
  services: string[];
}
