import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    fullname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
});

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
export const Post = mongoose.models?.Post || mongoose.model('Post', postSchema);
export const Comment =
  mongoose.models?.Comment || mongoose.model('Comment', commentSchema);
