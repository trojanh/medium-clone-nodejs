import { AuthenticationError } from "apollo-server-core";

export async function deleteTag(parent, args, { models, loggedInUser }) {
  const { id } = args;
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }

  const tag = await models.Tag.findOne({ _id: args.id });

  if (!tag) {
    throw new Error("Tag not found");
  }

  await models.Tag.deleteOne({ _id: id });
  await models.User.updateMany(
    { tags: id },
    { $pull: { tags: id } }
  );
  await models.Post.updateMany(
    { tags: id },
    { $pull: { tags: id } }
  );
  return tag;
}