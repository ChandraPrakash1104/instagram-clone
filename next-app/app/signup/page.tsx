'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/actions/user';
import AuthInput from '@/components/Shared/AuthInput';
import AuthButton from '@/components/Shared/AuthButton';
import { useRouter } from 'next/navigation';
import AlertMessage from '@/components/AlertMessage';

export interface SignupForm {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

const SignupPage = () => {
  const [error, setError] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState<SignupForm>({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const response = await signup(formData);
    if (response) {
      localStorage.setItem('id', response.id);
      localStorage.setItem('username', response.username);
      router.push('/');
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
    setFormData({
      email: '',
      fullName: '',
      username: '',
      password: '',
    });

    router.push('/');
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Sign up for Instagram</h2>
        <form onSubmit={handleSubmit}>
          <AuthInput
            label='Email'
            type='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            name='email'
          />
          <AuthInput
            label='Full Name'
            type='text'
            placeholder='Full Name'
            value={formData.fullName}
            onChange={handleChange}
            name='fullName'
          />
          <AuthInput
            label='Username'
            type='text'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            name='username'
          />
          <AuthInput
            label='Password'
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            name='password'
          />
          <AuthButton label='Sign Up' type='submit' />
        </form>
        <div className='text-sm mt-4'>
          Already have and Account?{' '}
          <Link href='/signin' className='text-sky-600'>
            Sign in
          </Link>
        </div>
      </div>
      <div className='absolute bottom-20'>
        {error && <AlertMessage type='warning' label='Something went wrong' />}
      </div>
    </div>
  );
};

export default SignupPage;
