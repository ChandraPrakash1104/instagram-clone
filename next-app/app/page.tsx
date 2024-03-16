import Appbar from '@/components/Appbar/Appbar';
import Feed from '@/components/Feed/Feed';

export default function Home() {
  return (
    <div className='bg-gray-100'>
      <Appbar />
      <Feed />
    </div>
  );
}
