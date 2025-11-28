import React, { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Input = {
  title: ReactNode;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: string;
};

export default function TextArea({
  title,
  placeholder,
  register,
  error,
}: Input) {
  return (
    <div className='flex-Col gap-2'>
      <label htmlFor='title' className={`${error ? 'text-red-500' : ''}`}>
        {title}
      </label>
      <textarea
        placeholder={placeholder}
        className={`outline-none hide-scrollbar border rounded-md p-4 bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-0 ${error ? 'border-red-500' : 'border-primaryCTA'} `}
        rows={4}
        {...register}
      />
      {error && <span className='text-red-500 '>{error}</span>}
    </div>
  );
}
