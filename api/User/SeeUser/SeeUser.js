export default {
  Query: {
    SeeUser: async (_, args, context) => {
      const { nickname } = args;
      return await context.prisma.User.findUnique({ where: { nickname } });
    },
  },
};
