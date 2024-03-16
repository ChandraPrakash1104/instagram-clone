import React from 'react';
import { MoreIcon } from '../Shared/Icons';
import Image from 'next/image';

const PostHeader = ({ username }: { username: string }) => {
  return (
    <div className='flex items-center justify-between px-4 py-2'>
      <div className='flex items-center space-x-4'>
        <div>
          <Image
            src='/default-user-image.jpg'
            alt='default avatar'
            width={32}
            height={32}
            className='w-8'
          />
        </div>
        <div className='font-semibold'>{username}</div>
      </div>
      <div>
        <MoreIcon />
      </div>
    </div>
  );
};

export default PostHeader;
