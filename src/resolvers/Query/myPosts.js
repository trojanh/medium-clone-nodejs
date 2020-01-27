import { AuthenticationError } from "apollo-server-core";

export async function myPosts(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to view myPosts");
  }

  return models.Post.find({ author: currentUser._id });
}