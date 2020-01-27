import { AuthenticationError } from "apollo-server-core";

export async function posts(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();
  const { cursor } = args;

  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to view posts");
  }
  const followingAuthors = currentUser.authors;
  const followingTags = currentUser.tags;

  const userPosts = await models.Post.find({
    type: "user",
    $or: [
      {
        tags: {
          $in: followingTags
        }
      },
      {
        author: {
          $in: followingAuthors
        }
      }
    ]
  }, [], {
    sort: {
      createdAt: -1 //Sort by Date DESC
    }
  });
  const nonUserPosts = await models.Post.find({
    type: { $ne: "user"},
    $or: [
      {
        tags: {
          $in: followingTags
        }
      },
      {
        author: {
          $in: followingAuthors
        }
      }
    ]
  }, [], {
    sort: {
      createdAt: -1 //Sort by Date DESC
    }
  });
  const posts = userPosts.reduce((acc, value, index) => {
    if(index > 1 && index % 2 === 0 && nonUserPosts.length > parseInt(index/2, 10)) {
      const nonUserPostIndex = parseInt(index/2, 10) -1;
      acc.push(nonUserPosts[nonUserPostIndex])
      if(nonUserPosts.length > nonUserPostIndex + 1){
        acc.push(nonUserPosts[nonUserPostIndex])
      }
    }
    acc.push(value)
    return acc;
  }, []);

  if(cursor){
    cursor.page = cursor.page ? cursor.page : 1;
    const startIndex = (cursor.limit * cursor.page) - cursor.limit;
    if(startIndex < 0 || startIndex >= posts.length){
      throw new Error("Invalid cursor");
    }
    const endIndex = (cursor.limit * cursor.page);
    return {
      posts: posts.slice(startIndex, endIndex),
      cursor: {
        totalCount: posts.length,
        hasNext: posts.length > endIndex
      }
    }
  }

  return { posts};
}