import { AuthenticationError } from "apollo-server-core";

export async function me(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to see `me` data.");
  }
  return currentUser;
}