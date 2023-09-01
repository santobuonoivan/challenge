import express from "express";
import { ApolloServer } from "apollo-server-express";
import "./db/mongo";

import Product from "./models/product";
import Sales from "./models/sales";

// Configura tu servidor Apollo
const server = new ApolloServer({
  typeDefs: ``,
  resolvers: {
    Query: {
      productCount: () => Product.collection.countDocuments(),
      allProducts: async (root, args) => {
        return Product.find();
      },
      findProduct: async (root, args) => {
        const { name } = args;
        return Product.findOne({ name });
      },
    },
    Mutation: {
        addProduct: async (root, args) => {
            const product = new Product({ ...args });
            return product.save();
        },
        editProduct: async ( root, args ) => {
            return Product.updateOne({ _id: args._id },{ $set: { ...args } })
        },
        deleteProduct: async ( root, args ) => {
            return Product.deleteOne({ _id: args._id })
        }
    }

  },
});

const app = express();
server.applyMiddleware({ app });

// Conecta a MongoDB y realiza otras configuraciones

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Servidor GraphQL en ejecución en http://localhost:${PORT}/graphql`
  );
});
