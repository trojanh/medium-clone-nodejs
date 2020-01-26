import { AuthenticationError } from "apollo-server-core";

export async function createPost(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();
  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }
  const { Post, User, Tag } = models;

  const post = {
    createdAt: Date.now(),
    ...args.data
  };
  // allow only loggedIn user if `type` of post is not `["guestUserA", "guestUserB"]`
  if (!["guestUserA", "guestUserB"].includes(args.data.type)) {
    const userExists = User.some(user => user.id === args.data.author);
    post.type = args.data.type;
    if (!userExists) {
      throw new Error("User not found");
    }
  } else {
    post.type = "user";
    post.author = currentUser._id;
  }

  if (args.data.tags) {
    const tags = await Tag.find({ _id: { $in: args.data.tags } });
    console.log({ tags });
    if (tags.length !== args.data.tags.length) {
      throw new Error("Invalid Tags");
    }
  }

  return Post.create(post);
}