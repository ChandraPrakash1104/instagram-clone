'use server';
import { connectToDb } from '@/lib/utils';
import { Comment, Post } from '@/lib/models';

export async function newPost(url: string, caption: string, id: string | null) {
  await connectToDb();

  try {
    if (!id) {
      throw 'Please login first';
    }
    await Post.create({ imageUrl: url, caption, author: id });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function fetchAllPosts() {
  await connectToDb();
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' },
      });

    const postsArray = posts.map((post) => {
      const { _id, caption, imageUrl, likes, comments, author, createdAt } =
        post;
      return {
        _id,
        caption,
        imageUrl,
        likes,
        comments: comments.map((comment: any) => ({
          _id: comment._id,
          content: comment.content,
          author: comment.author,
        })),
        author: {
          _id: author._id,
          username: author.username,
        },
        createdAt,
      };
    });

    console.log(postsArray);
    return postsArray;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const updateLike = async (id: string, inc: number) => {
  try {
    await connectToDb();
    console.log({ id, inc });

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: inc } },
      { new: true }
    );
    if (!updatedPost) {
      console.log('Post not found');
    } else {
      console.log('Updated post:', updatedPost);
    }
    console.log(updatedPost);
  } catch (error) {
    console.error(error);
  }
};

export const postComment = async (
  username: string,
  postId: string,
  comment: string
) => {
  try {
    await connectToDb();
    const newComment = await Comment.create({
      content: comment,
      author: username,
    });

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );
    return newComment;
  } catch (e) {
    console.log(e);
  }
};
