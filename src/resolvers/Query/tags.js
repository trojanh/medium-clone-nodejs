export function tags(parent, args, { models }) {
  return models.Tag.find({});
}