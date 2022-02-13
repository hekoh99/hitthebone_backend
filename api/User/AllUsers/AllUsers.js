import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  Query: {
    AllUsers: () => prisma.user.findMany(),
  },
};
