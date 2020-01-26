import { AuthenticationError } from "apollo-server-core";

export async function unFollowAuthor(parent, args, { models, loggedInUser }) {
  const { User } = models;
  const { userId } = args;
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to unfollow an author");
  }
  if (!currentUser.authors.includes(userId)) {
    throw new Error("You are not following this user!");
  }
  if (userId === currentUser._id) {
    throw new Error("You cannot unfollow yourself!");
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
      $pull: { authors: userId }
    },
    { new: true }
  );
}