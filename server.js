import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    createdAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!): Movie
    deleteMovie(id: Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => prisma.movie.findMany(),
    movie: (_, { id }) =>
      prisma.movie.findUnique({
        where: { id },
      }),
  },
  Mutation: {
    createMovie: (_, { title, year }) =>
      prisma.movie.create({
        data: {
          title,
          year,
        },
      }),
    deleteMovie: (_, { id }) =>
      prisma.movie.delete({
        where: { id },
      }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(() => console.log("server is running http://localhost:4000"));
