export const authResolver = (resolver) => (root, args, context, info) => {
  if (context.user === undefined)
    return { status: false, errorMsg: "please login first" };
  return resolver(root, args, context, info);
};
