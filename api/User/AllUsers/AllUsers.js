export default {
  Query: {
    AllUsers: async (_, __, context) => {
      return await context.prisma.User.findMany();
    },
  },
};
