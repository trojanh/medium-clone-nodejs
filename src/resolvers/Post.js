const Post = {
  author(parent, args, { models }, info) {
    return models.User.findOne({ _id: parent.author });
  },
  tags(parent, args, { models }, info) {
    return models.Tag.find({ _id: parent.tags });
  }
}

export { Post as default }
