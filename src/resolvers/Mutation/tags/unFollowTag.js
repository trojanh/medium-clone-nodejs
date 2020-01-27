import { AuthenticationError } from "apollo-server-core";

export async function unFollowTag(parent, args, { models, loggedInUser }) {
  const { Tag, User } = models;
  const { tagId } = args;
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to un-follow a tag");
  }
  if (!currentUser.tags.includes(tagId)) {
    throw new Error("You are not following this tag!");
  }

  const tag = await Tag.findOne({ _id: tagId });

  if (!tag) {
    throw new Error("Tag not found");
  }

  return await User.findOneAndUpdate(
    { _id: currentUser._id },
    { $pull: { tags: tagId } },
    { new: true }
  );
}