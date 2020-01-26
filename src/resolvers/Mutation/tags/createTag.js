import { AuthenticationError } from "apollo-server-core";

export async function createTag(parent, args, { models, loggedInUser }) {
  const { Tag } = models;
  const tagInput = { ...args.data };
  tagInput.name = tagInput.name.toLowerCase();
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }
  return Tag.create(tagInput);
}