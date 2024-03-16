'use client';

import { useState } from 'react';
import { GearIcon } from '../Shared/Icons';
import Link from 'next/link';
import { logoutHandler } from '../Shared/handler';
import AlertMessage from '../AlertMessage';

const Appbar = () => {
  const [gearClicked, setGearClicked] = useState(false);
  const [alert, setAlert] = useState(false);

  return (
    <div className='flex  bg-white justify-end mb-8'>
      <div className='h-12 flex items-center pr-8'>
        <div
          onClick={() => {
            setGearClicked(!gearClicked);
          }}
        >
          <GearIcon />
        </div>
      </div>
      {gearClicked && (
        <div className='absolute p-10 bg-white flex flex-col space-y-4 top-10'>
          <Link href='/signin'>Sign in</Link>
          <Link href='/signup'>Sign up</Link>
          <div
            onClick={async () => {
              logoutHandler();
              setAlert(true);
              setTimeout(() => {
                setAlert(false);
              }, 2000);
            }}
          >
            Logout
          </div>
        </div>
      )}
      {alert && (
        <div className='absolute bottom-0'>
          <AlertMessage label='You are Logged out' />
        </div>
      )}
    </div>
  );
};

export default Appbar;
