const User = {
  tags(parent, args, { models }, info) {
    return models.Tag.find({ _id: parent.tags});
  }
}

export { User as default }
