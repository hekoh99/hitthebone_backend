require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const PORT = process.env.SERVER_PORT;
const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    try {
      if (req.headers.authorization) {
        const { id } = await jwt.verify(
          req.headers.authorization,
          process.env.SECRET_KEY
        );
        const user = await prisma.User.findUnique({ where: { id } });
        if (user) return { user, prisma };
      } else return { req, prisma };
    } catch {
      return null;
    }
  },
});

server
  .listen(PORT)
  .then(() => console.log(`🚀 server is running http://localhost:${PORT}`));
