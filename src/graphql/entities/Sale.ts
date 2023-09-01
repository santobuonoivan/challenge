import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Ref } from "../../types";
import { Product } from "./Product";
import { __Type } from "graphql";

@ObjectType({ description: "The Product model" })
export class Sale {
  @Field(() => ID)
  id: String;

  @Field()
  @Property()
  client_name: String;

  @Field((_type) => Int)
  @Property()
  price: number;

  @Field()
  @Property()
  products: Array<{
    amount: number;
    price: number;
    product: Ref<Product>;
  }>;

  _doc: any;
}

export const SaleModel = getModelForClass(Sale);
