require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const PORT = process.env.SERVER_PORT;
const server = new ApolloServer({ schema });

server
  .listen(PORT)
  .then(() => console.log(`🚀 server is running http://localhost:${PORT}`));
