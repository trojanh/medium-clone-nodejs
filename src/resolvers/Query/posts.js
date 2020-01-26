import { AuthenticationError } from "apollo-server-core";

export async function posts(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();
  console.log("==>", currentUser)
  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }
  return models.Post.find({}, [], {
    sort: {
      createdAt: -1 //Sort by Date DESC
    }
  });
}