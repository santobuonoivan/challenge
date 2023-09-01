import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { Product, ProductModel } from "../entities/Product";
import { ProductInput } from "./types/product-input";

@Resolver((_of) => Product)
export class ProductResolver {
  @Query((_returns) => Product, { nullable: false })
  async returnSingleProduct(@Arg("filter") filter: string) {
    return await ProductModel.findOne({
      $or: [{ name: filter }, { code: filter }],
    });
  }

  @Query(() => [Product])
  async returnAllProduct(
    @Arg("sortBy", { nullable: true }) sortBy: string,
    @Arg("sortDirection", { nullable: true }) sortDirection: "asc" | "desc"
  ) {
    const query = ProductModel.find();

    if (sortBy) {
      const sortOptions: any = { [sortBy]: sortDirection === "asc" ? 1 : -1 };
      query.sort(sortOptions);
    }

    return await query.exec();
  }
  @Mutation(() => Product)
  async createProduct(
    @Arg("data")
    { name, amount, price, code }: ProductInput
  ): Promise<Product> {
    const product = (
      await ProductModel.create({
        name,
        amount,
        price,
        code,
      })
    ).save();
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id") id: string) {
    await ProductModel.deleteOne({ id });
    return true;
  }
}
