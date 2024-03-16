'use client';

import { useState } from 'react';
import AuthInput from '@/components/Shared/AuthInput';
import AuthButton from '@/components/Shared/AuthButton';
import Link from 'next/link';
import { signin } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import AlertMessage from '@/components/AlertMessage';

export interface SigninForm {
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState<SigninForm>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await signin(formData);
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
      password: '',
    });
  };

  return (
    <div className='flex justify-center items-center h-screen bg-slate-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Sign in for Instagram</h2>
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
            label='Password'
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            name='password'
          />
          <AuthButton label='Sign in' type='submit' />
        </form>
        <div className='text-sm mt-4'>
          Already have and Account?{' '}
          <Link href='/signup' className='text-sky-600'>
            Sign up
          </Link>
        </div>
      </div>
      <div className='absolute bottom-20'>
        {error && (
          <AlertMessage
            type='warning'
            label='Password not matched or user does not exists'
          />
        )}
      </div>
    </div>
  );
};

export default Page;
