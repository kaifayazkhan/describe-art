import React, { ReactNode } from 'react';
import AuthHeader from './AuthHeader';

function FormWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <AuthHeader />
      <main className='w-full flex justify-center items-center padding-x min-h-[calc(100vh_-_170px)]'>
        <section className='w-full md:w-2/5 md:min-w-[450px] max-w-xl p-4 md:p-8'>
          <h1 className='text-medium mb-4'>{title}</h1>
          {children}
        </section>
      </main>
    </div>
  );
}

export default FormWrapper;
