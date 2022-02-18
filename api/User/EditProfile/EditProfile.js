export default {
  Mutation: {
    EditProfile: async (_, args, context) => {
      return context.prisma.Post.findMany({ where: {} });
    },
  },
};
