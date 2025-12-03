import Link from 'next/link';
import React from 'react';

export default function SuccessModal({
  message,
  path,
  btnText,
}: {
  message: string;
  path?: string;
  btnText?: string;
}) {
  return (
    <div className='fixed inset-0 flex-center bg-darkOverlay padding-x z-[1000]'>
      <div className='relative  mx-auto p-5 w-96 shadow-lg rounded-xl bg-secondaryBg'>
        <div className='mt-3 text-center'>
          <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100'>
            <svg
              className='h-6 w-6 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M5 13l4 4L19 7'
              ></path>
            </svg>
          </div>
          <h3 className='text-lg leading-6 font-medium  mt-3'>Successful!</h3>
          <div className='mt-2 px-7 py-3'>
            <p className='text-sm text-gray-500'>{message}</p>
          </div>
          <div className='items-center px-4 py-3'>
            <Link
              href={path ? path : '/sign-in'}
              className='px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600'
            >
              {btnText ? btnText : 'Go Back to Login'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
