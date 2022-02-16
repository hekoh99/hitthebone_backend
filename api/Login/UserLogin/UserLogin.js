import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    UserLogin: async (_, args, context) => {
      const { nickname, password } = args;
      const dbUser = await context.prisma.User.findUnique({
        where: {
          nickname,
        },
      });
      if (!dbUser)
        return {
          status: false,
          errorMsg: `no user called ${nickname}`,
        };
      const status = await bcrypt.compare(password, dbUser.password);
      if (!status)
        return {
          status,
          errorMsg: `wrong password`,
        };
      /* to set expiration date, send {expiresIn} or {notBefore} on third parameter */
      const token = await jwt.sign({ id: dbUser.id }, process.env.SECRET_KEY);
      return {
        status: true,
        token,
      };
    },
  },
};
