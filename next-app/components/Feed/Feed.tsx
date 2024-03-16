'use client';
import { useEffect, useState } from 'react';
import AddNewPostButton from './AddNewPostButton';
import Post from './Post';
import { fetchAllPosts } from '@/app/actions/post';

interface Comment {
  _id: string;
  content: string;
  author: string;
}

interface PostData {
  _id: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
  author: { _id: string; username: string };
  createdAt: Date;
}

const Feed = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetchAllPosts();
      if (data) {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col space-y-4'>
        {posts.map((post) => (
          <Post
            id={post._id}
            likes={post.likes}
            username={post.author.username}
            comments={post.comments}
            key={post._id}
            url={post.imageUrl}
          />
        ))}
      </div>
      <div className='fixed bottom-4 bg-slate-200 px-3 py-2 rounded-lg'>
        <AddNewPostButton />
      </div>
    </div>
  );
};

export default Feed;
