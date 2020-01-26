import { AuthenticationError } from "apollo-server-core";

export async function login(parent, args, { models }) {
  try {
    const { User } = models;
    const user = await User.findOne({ username: args.username });

    if (!user) throw new Error("User not found");
    if (!user.verifyPassword(args.password)) {
      throw new AuthenticationError("Invalid username or password");
    }

    return {
      ...user,
      token: user.getJWT()
    }

  } catch (error) {
    throw new Error(error);
  }
}