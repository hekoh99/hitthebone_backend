import bcrypt from "bcrypt";
import { authResolver } from "../../../utils/authResolver";

const editFunc = async (_, args, context) => {
  const { nickname, email, password } = args;
  let hashedPwd = null;
  if (password) hashedPwd = await bcrypt.hash(password, 10);
  const updatedUser = await context.prisma.User.update({
    where: {
      id: context.user.id,
    },
    data: {
      nickname,
      email,
      ...(hashedPwd && { password: hashedPwd }),
    },
  });
  if (updatedUser.id) return { status: true };
  return { status: false, errorMsg: "cannot update profile" };
};

export default {
  Mutation: {
    EditProfile: authResolver(editFunc),
  },
};
