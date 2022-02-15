import bcrypt from "bcrypt";

export default {
  Mutation: {
    CreateAccount: async (_, args, context) => {
      try {
        const { email, password, nickname } = args;
        const isExist = await context.prisma.User.findFirst({
          where: {
            OR: [{ email }, { nickname }],
          },
        });
        if (isExist) throw Error("duplicated email or nickname");
        const hashedPwd = await bcrypt.hash(password, 10);
        return context.prisma.User.create({
          data: {
            email,
            nickname,
            password: hashedPwd,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
