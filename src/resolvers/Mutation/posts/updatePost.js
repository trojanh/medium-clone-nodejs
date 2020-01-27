import { AuthenticationError } from "apollo-server-core";

export async function updatePost(parent, args, { models, loggedInUser }) {
  const { id, data } = args;
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be update the post");
  }

  const post = await models.Post.findOne({ _id: args.id });
  if (!post) {
    throw new Error("Post not found");
  }

  if(!currentUser._id.equals(post.author)) {
    throw new Error("You should be author of post");
  }

  return models.Post.findOneAndUpdate({ _id: id }, data,  { new: true });
}