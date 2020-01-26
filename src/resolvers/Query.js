const Query = {
  users(parent, args, { models }) {
    return models.Users.find({});
  },
  posts(parent, args, { models }) {
    return models.Post.find({});
  },
  async tags(parent, args, { models }) {
    console.log(await models.Tag.find({}))
    return models.Tag.find({});
  }
}

export { Query as default }
