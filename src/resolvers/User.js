const User = {
  authors(parent, args, { models }, info) {
    return models.User.find({ _id: parent.authors});
  },
  tags(parent, args, { models }, info) {
    return models.Tag.find({ _id: parent.tags});
  }
}

export { User as default }
