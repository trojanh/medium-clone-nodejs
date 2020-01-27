import { AuthenticationError } from "apollo-server-core";

export async function followAuthor(parent, args, { models, loggedInUser }) {
  const { User } = models;
  const { userId } = args;
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow an author");
  }
  if (currentUser._id.equals(userId)) {
    throw new Error("You cannot follow yourself!");
  }
  if (currentUser.authors.includes(userId)) {
    throw new Error("You already follow this user!");
  }
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new Error("User not found");
  }

  return User.findOneAndUpdate(
    {
      _id: currentUser._id
    },
    {
      $addToSet: { authors: userId }
    },
    { new: true }
  );
}