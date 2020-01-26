export function tags(parent, args, { models }) {
  return models.Tag.find({}, [], {
    sort: {
      createdAt: -1 //Sort by Date DESC
    }
  });
}