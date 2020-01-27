import { AuthenticationError } from "apollo-server-core";

export async function deletePost(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();
  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to delete a post");
  }

  const post = await models.Post.findOne({ _id: args.id });
  if (!post) {
    throw new Error("Post not found");
  }

  if(!currentUser._id.equals(post.author)) {
    throw new Error("You should be author of post");
  }

  await models.Post.deleteOne({ _id: args.id });

  return post;
}