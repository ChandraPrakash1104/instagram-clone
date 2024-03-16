'use client';

import { useState } from 'react';
import { postComment } from '@/app/actions/post';
import { Comment } from './Post';
import AlertMessage from '../AlertMessage';
import { isSignedIn } from '../Shared/handler';

const AddComment = ({
  postId,
  handleNewComment,
}: {
  postId: string;
  handleNewComment: (newComment: Comment) => void;
}) => {
  const [typedComment, setTypedComment] = useState('');
  const username = localStorage.getItem('username') || '';
  const [alert, setAlert] = useState(false);
  const [isValid, setIsValid] = useState(false);

  return (
    <div className='text-sm flex justify-between'>
      <input
        type='text'
        placeholder='Add a comment'
        className='border-none outline-none bg-transparent placeholder-gray-400 '
        value={typedComment}
        onChange={(e) => {
          setIsValid(false);
          setTypedComment(e.target.value);
          if (!isSignedIn()) {
            setAlert(true);
            setIsValid(false);

            setTimeout(() => {
              setAlert(false);
            }, 2000);
          }
        }}
      />
      {isValid && (
        <button
          className='text-sky-500 font-semibold hover:text-slate-800 transition-all'
          onClick={async () => {
            const newComment = await postComment(
              username,
              postId,
              typedComment
            );
            console.log(newComment);

            handleNewComment(newComment);
            setTypedComment('');
          }}
        >
          Post
        </button>
      )}
      {alert && (
        <div className='absolute bottom-0'>
          <AlertMessage label='Please Sign in first' type='warning' />
        </div>
      )}
    </div>
  );
};

export default AddComment;
