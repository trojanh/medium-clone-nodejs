import { AuthenticationError } from "apollo-server-core";

export async function posts(parent, args, { models, loggedInUser }) {
  const currentUser = await loggedInUser();
  console.log("==>", currentUser)
  if (!currentUser) {
    throw new AuthenticationError("You must be logged in to follow a tag");
  }
  const followingAuthors = currentUser.authors;
  const followingTags = currentUser.tags;
  console.log({followingTags})
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
console.log({posts, userPosts, nonUserPosts})
  // console.log({respo})
  return posts;
}