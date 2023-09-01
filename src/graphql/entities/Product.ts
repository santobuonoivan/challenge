import { ObjectType, Field, ID, Int } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType({ description: 'The Product model' })
export class Product {  
  @Field(() => ID)
  id: String;

  @Field()
  @Property()
  name: String;

  @Field()
  @Property()
  code: String;

  @Field(() => Int)
  @Property()
  amount: number;

  @Field(() => Int)
  @Property()
  price: number;
}

export const ProductModel = getModelForClass(Product);
