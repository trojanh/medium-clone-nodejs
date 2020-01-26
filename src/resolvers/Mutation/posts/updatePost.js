import { AuthenticationError } from "apollo-server-core";

export async function updatePost(parent, args, { models, loggedInUser }) {
  const { id, data } = args;
  let postInput = { ...data };
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }
  const post = await models.Post.findOne({ _id: args.id });
  if (data.tags) {
    delete postInput.tags;
    postInput.$addToSet = { tags: "accessories" };
  }
  const resp = await models.Post.updateOne({ _id: id }, data);
  console.log(resp);
  return post;
}