import { AuthenticationError } from "apollo-server-core";

export async function signup(parent, args, { models }) {
  try {
    const { User } = models;
    const checkUniqueUser = await User.findOne({ username: args.username });
    if (checkUniqueUser) {
      throw new AuthenticationError("username already taken");
    }

    const newUser = new User(args);
    newUser.password = newUser.hashPassword(args.password);
    const user = await User.create(newUser);
    console.log(user, user._id);
    return {
      _id: user._id,
      username: user.username,
      token: user.getJWT()
    };
  } catch (error) {
    throw new Error(error);
  }
}