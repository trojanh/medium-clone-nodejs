import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required',
    unique: [true, 'Tag name already exists']
  }
});

export default mongoose.model('Tag', TagSchema);