export async function users(parent, args, { models, loggedInUser }) {
  return models.User.find({});
}