import PostCard from '../card/PostCard';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import Image from 'next/image';

export interface Comment {
  _id: string;
  content: string;
  author: string;
}

const Post = ({
  id,
  likes,
  username,
  comments,
  url,
}: {
  id: string;
  likes: number;
  username: string;
  comments: Comment[];
  url: string;
}) => {
  return (
    <PostCard>
      <PostHeader username={username} />
      <div>
        <Image
          src={url}
          alt=''
          width={640}
          height={480}
          className='w-full h-auto object-cover max-h-[700px]'
        />
      </div>
      <PostFooter likes={likes} comments={comments} id={id} />
    </PostCard>
  );
};

export default Post;
