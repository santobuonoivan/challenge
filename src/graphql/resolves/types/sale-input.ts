import { InputType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { Sale } from '../../entities/Sale';
import { Product } from '../../entities/Product';
import { Ref } from '../../../types';
import { Prop } from '@typegoose/typegoose';

@InputType()
class ProductInputInfo {
  @Field()
  amount: number;

  @Field()
  price: number;

 @Field((_type) => ID)
  @Prop({ ref: "Product" })
  product: Ref<Product>;
}
@InputType()
export class SaleInput implements Partial<Sale> {
  @Field()
  @Length(1, 255)
  client_name: string; // Cambié "String" a "string" en minúsculas

  @Field()
  price: number;

  @Field(() => [ProductInputInfo]) // Especifica que 'products' es una lista de ProductInput
  products: ProductInputInfo[];
}