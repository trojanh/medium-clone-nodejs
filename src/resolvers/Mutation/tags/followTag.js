import { AuthenticationError } from "apollo-server-core";

export async function followTag (parent, args, { models, loggedInUser }) {
  const { Tag, User } = models;
  const { tagId } = args;
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }
  if(currentUser.tags.includes(tagId)) {
    throw new Error("You already follow this tag!");
  }
  const tag = await Tag.findOne({ _id: tagId });

  if (!tag) {
    throw new Error("Tag not found");
  }

  return User.findOneAndUpdate(
    {
      _id: currentUser._id
    },
    {
      $addToSet: { tags: tagId }
    },
    { new: true }
  );
}