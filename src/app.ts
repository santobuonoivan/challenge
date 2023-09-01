import Express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import 'reflect-metadata';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ProductResolver } from './graphql/resolves/Product';
import { SaleResolver } from './graphql/resolves/Sale';
import * as dotenv from 'dotenv';
dotenv.config();


const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      ProductResolver,
      SaleResolver,
    ],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const MONGODB_URI = process.env.MONGODB_URI || "";

  const mongoose = await connect(MONGODB_URI);
  await mongoose.connection;

  const server = new ApolloServer({
    schema,
    plugins: [ ApolloServerPluginLandingPageGraphQLPlayground ],
  });

  const app = Express();

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3000;
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, 'error');
});