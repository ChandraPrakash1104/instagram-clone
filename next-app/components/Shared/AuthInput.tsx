import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const AuthInput: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <div className='mb-4 text-sm'>
      <input
        className=' appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default AuthInput;
