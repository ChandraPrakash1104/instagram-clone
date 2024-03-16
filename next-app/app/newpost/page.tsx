'use client';

import { newPost } from '@/app/actions/post';
import AlertMessage from '@/components/AlertMessage';
import { UploadIcon } from '@/components/Shared/Icons';
import { isSignedIn } from '@/components/Shared/handler';
import PostCard from '@/components/card/PostCard';
import { useEdgeStore } from '@/lib/edgestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewPost = () => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [alert, setAlert] = useState(false);
  const [isValid, setIsValid] = useState(false);

  if (typeof window !== 'undefined' && !isSignedIn()) {
    router.push('/signin');
  }
  const handlePostSubmit = async () => {
    console.log({ caption, image });

    if (image) {
      const res = await edgestore.publicFiles.upload({
        file: image,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      console.log(res);
      const response = await newPost(
        res.url,
        caption,
        localStorage.getItem('id')
      );
      if (response) {
        router.push('/');
      } else {
        console.log('something went wrong while uploading');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window !== 'undefined' && !isSignedIn()) {
      router.push('/signin');
    }
    const image = e.target.files?.[0] ?? null;
    console.log(image);

    if (image && image.size >= 1024 * 1024 * 5) {
      setAlert(true);
      setIsValid(false);
      console.log('image is too big');
    } else {
      setIsValid(true);
      setImage(image);
    }
  };

  return (
    <div className='flex justify-center'>
      <PostCard>
        <div className='flex flex-col items-center justify-center w-full'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 '
          >
            {!image && (
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <UploadIcon />
                <p className='mb-2 text-sm text-gray-500 '>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-gray-500 '>JPG, PNG (MAX. 5mb)</p>
              </div>
            )}
            {image && (
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <UploadIcon />
                <p className='mb-2 text-sm text-gray-500 '>
                  <span className='font-semibold'>Click to Reupload</span> or
                  drag and drop
                </p>
                <p className='text-xs text-gray-500 '>JPG, PNG (MAX. 5mb)</p>
              </div>
            )}
            <input
              id='dropzone-file'
              type='file'
              className='hidden'
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className='p-4 flex justify-between'>
          <div className='flex-grow'>
            <input
              type='text'
              placeholder='Write a caption'
              className='w-full h-20 outline-none hover:border rounded-lg hover:border-slate-200 p-3'
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />
          </div>
          {isValid && (
            <button
              className='text-sky-500 font-semibold hover:text-slate-800 transition-all pl-4'
              onClick={handlePostSubmit}
            >
              Post
            </button>
          )}
        </div>
      </PostCard>
      {alert && (
        <div className='absolute bottom-10'>
          <AlertMessage
            type='warning'
            label='please upload image of size smaller than 5mb!'
          />
        </div>
      )}
    </div>
  );
};

export default NewPost;
