import { AddIcon } from '../Shared/Icons';
import Link from 'next/link';

const AddNewPostButton = () => {
  return (
    <Link className='flex space-x-2 text-sm items-center' href='/newpost'>
      <AddIcon />
      <div className='font-semibold'>New Post</div>
    </Link>
  );
};

export default AddNewPostButton;
