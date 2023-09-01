import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';
import { Sale } from '../../entities/Sale';
import { Product } from '../../entities/Product';
import { Ref } from '../../../types';

@InputType()
export class SaleInput implements Partial<Sale> {
  
  @Field()
  @Length(1, 255)
  client_name: String;

  @Field()
  price: number;
  
  @Field()
  products: Array<{
    amount: number;
    price: number;
    product: Ref<Product>;
  }>;
}