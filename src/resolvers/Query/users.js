export async function users(parent, args, { models, loggedInUser }) {
  return models.User.find({}, [], {
    sort: {
      createdAt: -1 //Sort by Date DESC
    }
  });
}