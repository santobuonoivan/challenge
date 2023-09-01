import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { Product } from '../../entities/Product';

@InputType()
export class ProductInput implements Partial<Product> {
  
  @Field()
  @Length(1, 255)
  name: String;

  @Field()
  @Length(1, 255)
  code: String;

  @Field()
  amount: number;

  @Field()
  price: number;

}