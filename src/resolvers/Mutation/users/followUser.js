import { AuthenticationError } from "apollo-server-core";

export async function followTag (parent, args, { models, loggedInUser }) {
  const { User } = models;
  const { userId } = args;
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }
  if(userId === currentUser._id) {
    throw new Error("You cannot follow yourself!");
  }
  if(currentUser.tags.includes(tagId)) {
    throw new Error("You already follow this author!");
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
      $addToSet: { authors: tagId }
    },
    { new: true }
  );
}