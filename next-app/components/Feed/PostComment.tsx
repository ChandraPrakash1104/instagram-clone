const PostComment = ({
  username,
  comment,
}: {
  username: string;
  comment: string;
}) => {
  return (
    <div className='text-sm flex space-x-2'>
      <div className='font-semibold'>{username}</div>
      <div className=''>{comment}</div>
    </div>
  );
};

export default PostComment;
