export default {
  Mutation: {
    CreateAccount: async (_, args, context) => {
      const { email, password, nickname } = args;
      return await context.prisma.User.create({
        data: {
          email,
          nickname,
          password,
        },
      });
    },
  },
};
