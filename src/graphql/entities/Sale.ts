import { ObjectType, Field, ID, Int } from "type-graphql";
import { Prop, prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "../../types";
import { Product } from "./Product";
import { __Type } from "graphql";

@ObjectType()
class ProductSaleInfo {
  @Field()
  @Prop()
  amount: number;

  @Field()
  @Prop()
  price: number;

  @Field((_type) => Product)
  @Prop({ ref: "Product" })
  product: Ref<Product>;
}
@ObjectType({ description: "The Sale model" })
export class Sale {
  @Field(() => ID)
  id: String;

  @Field()
  @Property()
  client_name: String;

  @Field((_type) => Int)
  @Property()
  price: number;

  @Field((_type) => [ProductSaleInfo])
  @Prop({ type: () => [ProductSaleInfo] })
  products: ProductSaleInfo[];

  _doc: any;
}

export const SaleModel = getModelForClass(Sale);
