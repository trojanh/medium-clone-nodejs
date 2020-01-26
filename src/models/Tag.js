import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: [true, 'username already exists']
  }
});

export default mongoose.model('Tag', TagSchema);