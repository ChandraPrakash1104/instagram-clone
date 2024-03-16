import React from 'react';

interface ButtonProps {
  label: string;
  type: 'button' | 'submit' | undefined;
  onClick?: () => void;
}

const AuthButton: React.FC<ButtonProps> = ({ label, type, onClick }) => {
  return (
    <button
      className='bg-blue-500 w-full hover:bg-blue-600 text-white font-semibold text-sm  py-1 px-4 rounded-lg focus:outline-none focus:shadow-outline'
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AuthButton;
