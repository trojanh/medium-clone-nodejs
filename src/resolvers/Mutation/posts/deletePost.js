import { AuthenticationError } from "apollo-server-core";

export async function deletePost(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();
  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }

  const post = await models.Post.findOne({ _id: args.id });
  if (!post) {
    throw new Error("Post not found");
  }

  await models.Post.deleteOne({ _id: args.id });

  return post;
}