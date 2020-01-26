import uuidv4 from "uuid/v4";
import { AuthenticationError } from "apollo-server-core";

const Mutation = {
  signup: async (parent, args, { models }) => {
    try {
      if (!args.username || !args.password)
        throw new AuthenticationError("invalid username or password");
      const { User } = models;
      const checkUniqueUser = await User.findOne({ username: args.username });
      if (checkUniqueUser) {
        throw new AuthenticationError("username already taken");
      }

      const newUser = new User(args);
      newUser.password = newUser.hashPassword(args.password);
      const user = await User.create(newUser);
      console.log(user, user._id);
      return {
        _id: user._id,
        username: user.username,
        token: user.getJWT()
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  login: async (parent, args, { models }) => {
    try {
      const { User } = models;

      const user = await User.findOne({ username: args.username });

      if (!user) throw new Error("User not found");
      if (!user.verifyPassword(args.password)) {
        throw new Error("Password incorrect");
      }
      return {
        _id: user._id,
        username: user.username,
        token: user.getJWT()
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  createPost: async (parent, args, { models, loggedInUser }) => {
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
  },
  deletePost: async (parent, args, { models, loggedInUser }) => {
    const currentUser = await loggedInUser();
    if (!currentUser) {
      throw new AuthenticationError("You must be logged in to follow a tag");
    }

    const post = await models.Post.findOne({ _id: args.id });
    if (!post) {
      throw new Error("Post not found");
    }

    await models.Post.deleteOne({ _id: args.id });

    return post;
  },
  updatePost: async (parent, args, { models, loggedInUser }) => {
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
  },
  createTag: async (parent, args, { models, loggedInUser }) => {
    const { Tag } = models;
    const tagInput = { ...args.data };
    tagInput.name = tagInput.name.toLowerCase();
    const currentUser = await loggedInUser();

    if (!currentUser) {
      throw new AuthenticationError("You must be logged in to follow a tag");
    }
    return Tag.create(tagInput);
  },
  deleteTag: async (parent, args, { models, loggedInUser }) => {
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
    return tag;
  },
  followTag: async (parent, args, { models, loggedInUser }) => {
    const { Tag, User } = models;
    const { tagId } = args;
    const currentUser = await loggedInUser();

    if (!currentUser) {
      throw new AuthenticationError("You must be logged in to follow a tag");
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
  },
  unFollowTag: async (parent, args, { models, loggedInUser }) => {
    const { Tag, User } = models;
    const { tagId } = args;
    const currentUser = await loggedInUser();

    if (!currentUser) {
      throw new AuthenticationError("You must be logged in to follow a tag");
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
};

export { Mutation as default };
