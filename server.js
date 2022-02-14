require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PORT = process.env.SERVER_PORT;
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return { req, prisma };
  },
});

server
  .listen(PORT)
  .then(() => console.log(`🚀 server is running http://localhost:${PORT}`));
