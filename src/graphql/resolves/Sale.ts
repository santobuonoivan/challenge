import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
} from "type-graphql";
import { Sale, SaleModel } from "../entities/Sale";
import { Product, ProductModel } from "../entities/Product";
import { SaleInput } from "./types/sale-input";

@Resolver((_of) => Sale)
export class SaleResolver {
  @Query((_returns) => Sale, { nullable: false })
  async returnSingleSale(@Arg("id") id: string) {
    return await SaleModel.findById({ _id: id });
  }

  @Query(() => [Sale])
  async returnAllSale() {
    return await SaleModel.find();
  }

  @Query(() => Product, { nullable: true })
  async mostSoldProduct() {
    const sales = await SaleModel.find();

    // Inicializar un mapa para realizar un seguimiento de la cantidad vendida de cada producto
    const productCountMap = new Map<string, number>();

    // Iterar a través de cada venta y cada producto en esas ventas
    sales.forEach((sale) => {
      sale.products.forEach((saleProduct) => {
        // Obtener el ID del producto como una cadena
        const productId = saleProduct.product.toString();

        // Actualizar el conteo del producto en el mapa
        // Si no existe, inicializa el conteo en 0 y luego suma la cantidad vendida
        productCountMap.set(
          productId,
          (productCountMap.get(productId) || 0) + saleProduct.amount
        );
      });
    });

    

    // Encontrar el producto más vendido
    let mostSoldProductId: string | null = null;
    let mostSoldAmount = 0;

    for (const [productId, amount] of productCountMap.entries()) {
      if (amount > mostSoldAmount) {
        mostSoldProductId = productId;
        mostSoldAmount = amount;
      }
    }

    // Si se encontró un producto más vendido, buscarlo por su ID
    if (mostSoldProductId) {
      const product = await ProductModel.findById(mostSoldProductId);
      return { product, amount: mostSoldAmount };
    }

    // Si no se encontró ningún producto, devolver nulo
    return null;
  }

  @Query(() => Product, { nullable: true })
async mostProfitableProduct() {
  const sales = await SaleModel.find();

  // Inicializar un mapa para realizar un seguimiento de las ganancias de cada producto
  const productProfitMap = new Map<string, number>();

  // Iterar a través de cada venta y cada producto en esas ventas
  sales.forEach((sale) => {
    sale.products.forEach((saleProduct: {
        amount: number,
        product: any
    }) => {
      // Obtener el ID del producto como una cadena
      const productId = saleProduct.product.toString();
      const productPrice = saleProduct.product.price; // Obtener el precio del producto
      const profit = saleProduct.amount * productPrice; // Calcular ganancias

      // Actualizar las ganancias del producto en el mapa
      // Si no existe, inicializa las ganancias en 0 y luego suma las ganancias
      productProfitMap.set(productId, (productProfitMap.get(productId) || 0) + profit);
    });
  });

  // Encontrar el producto más rentable
  let mostProfitableProductId: string | null = null;
  let mostProfitableAmount = 0;

  for (const [productId, profit] of productProfitMap.entries()) {
    if (profit > mostProfitableAmount) {
      mostProfitableProductId = productId;
      mostProfitableAmount = profit;
    }
  }

  // Si se encontró un producto más rentable, buscarlo por su ID
  if (mostProfitableProductId) {
    const product = await ProductModel.findById(mostProfitableProductId);
    return { product, amount: mostProfitableAmount };
  }

  // Si no se encontró ningún producto, devolver nulo
  return null;
}

  @Mutation(() => Sale)
  async createSale(
    @Arg("data")
    { client_name, price, products }: SaleInput
  ): Promise<Sale> {
    const sale = (
      await SaleModel.create({
        client_name,
        price,
        products,
      })
    ).save();
    return sale;
  }

  @Mutation(() => Boolean)
  async deleteSale(@Arg("id") id: string) {
    await SaleModel.deleteOne({ id });
    return true;
  }
}
