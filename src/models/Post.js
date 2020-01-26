import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    index: true
  }],
  title: { type: String, index: true },
  body: { type: String, index: true },
  createdAt: { type: Date },
  type: {
    type: String,
    enum : ['user','guestUserA', 'guestUserB'],
    required: 'Post type is required',
  }
});

export default mongoose.model('Post', PostSchema);