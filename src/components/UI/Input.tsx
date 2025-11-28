import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Input = {
  title: string;
  type?: string;
  placeholder: string;
  value?: number;
  register?: UseFormRegisterReturn;
  error?: string;
};

export default function InputBox({
  title,
  type,
  placeholder,
  value,
  register,
  error,
}: Input) {
  return (
    <div className='flex-Col gap-2'>
      <label htmlFor={title} className={`${error ? 'text-red-500' : ''}`}>
        {title}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`outline-none border rounded-md p-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-0 bg-transparent ${error ? 'border-red-500' : 'border-primaryCTA'} `}
        {...register}
      />
      {error && <span className='text-red-500'>{error}</span>}
    </div>
  );
}
