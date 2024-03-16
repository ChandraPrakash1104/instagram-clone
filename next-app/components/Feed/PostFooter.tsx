'use client';

import { useEffect, useState } from 'react';
import {
  ActiveLikeIcon,
  CommentIcon,
  LikeIcon,
  SaveIcon,
  ShareIcon,
} from '../Shared/Icons';
import AddComment from './AddComment';
import PostComment from './PostComment';
import { updateLike } from '@/app/actions/post';
import { Comment } from './Post';
import { io } from 'socket.io-client';

const PostFooter = ({
  id,
  likes,
  comments,
}: {
  id: string;
  likes: number;
  comments: Comment[];
}) => {
  const [isLiked, toggleIsLiked] = useState(true);
  const [currLikes, setCurrLikes] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [currComments, setCurrComments] = useState(comments);
  const [latestComment, setLatestComment] = useState(
    currComments[currComments.length - 1]
  );
  const [socket, setSocket] = useState<any>(undefined);

  const handleNewComment = (comment: Comment) => {
    const tempComments = currComments;
    tempComments.push(comment);
    setShowComments(false);
    socket.emit('update-comment', comment, id);
    setCurrComments(tempComments);
  };

  useEffect(() => {
    const getSocket = io('https://instagram-clone-socket-server.onrender.com');

    getSocket.on('like', (like, resId) => {
      if (resId === id) {
        setCurrLikes(like);
      }
    });

    getSocket.on('update-comment', (updatedComment, resId) => {
      if (resId === id) {
        console.log(updatedComment);
        setLatestComment(updatedComment);
      }
    });
    setSocket(getSocket);
  }, [id]);

  return (
    <div className='py-4 px-4 space-y-2'>
      <div className='flex justify-between'>
        <div className='flex space-x-4'>
          <div
            onClick={async () => {
              updateLike(id, isLiked ? 1 : -1);
              setCurrLikes((prevLikes) => {
                const inc = isLiked ? 1 : -1;
                socket.emit('like', prevLikes + inc, id);

                return prevLikes + inc;
              });
              toggleIsLiked(!isLiked);
            }}
          >
            {isLiked ? <LikeIcon /> : <ActiveLikeIcon />}
          </div>
          <div>
            <CommentIcon />
          </div>
          <div>
            <ShareIcon />
          </div>
        </div>
        <div>
          <SaveIcon />
        </div>
      </div>
      <div className='text-sm font-semibold'>{currLikes} likes</div>
      {currComments.length > 1 && !showComments && (
        <div
          className='text-sm text-slate-500'
          onClick={() => setShowComments(!showComments)}
        >
          View all {currComments?.length || 0} comments
        </div>
      )}
      {currComments.length > 0 && !showComments && (
        <div className='overflow-auto my-2'>
          <PostComment
            username={latestComment.author}
            comment={latestComment.content}
          />
        </div>
      )}
      {showComments && (
        <div
          className='text-sm text-slate-500'
          onClick={() => setShowComments(!showComments)}
        >
          Hide comments
        </div>
      )}
      <div className='overflow-auto max-h-52 '>
        {showComments && (
          <div className='flex flex-col space-y-2 flex-wrap'>
            {currComments.map((comment, index) => (
              <PostComment
                username={comment.author}
                comment={comment.content}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <AddComment postId={id} handleNewComment={handleNewComment} />
      </div>
    </div>
  );
};

export default PostFooter;
