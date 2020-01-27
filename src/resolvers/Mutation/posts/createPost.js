import { AuthenticationError } from "apollo-server-core";

export async function createPost(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();
  console.log(args, ["guestUserA", "guestUserB"].includes(args.data.type))
  if (!currentUser && !["guestUserA", "guestUserB"].includes(args.data.type)) {
    throw new AuthenticationError("You must be logged in to add a post.");
  }
  const { Post, User, Tag } = models;

  const post = {
    createdAt: Date.now(),
    ...args.data
  };
  // allow only loggedIn user if `type` of post is not `["guestUserA", "guestUserB"]`
  if (!["guestUserA", "guestUserB"].includes(args.data.type)) {
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