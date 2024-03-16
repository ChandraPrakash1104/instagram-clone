const PostCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-screen sm:w-[550px] border-b border-gray-300 pb-4 shadow-md bg-white shadow-slate-300'>
      {children}
    </div>
  );
};

export default PostCard;
