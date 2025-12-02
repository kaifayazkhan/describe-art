import React from 'react';
import GenerateSidebar from './_components/Sidebar';
import OutputImages from './_components/OutputImages';
import GenerateContextProvider from '@/context/Generate';
import Header from '@/components/Header';

export default async function Generate() {
  return (
    <GenerateContextProvider>
      <Header padding='px-3' />
      <div className='flex-Col h-full md:flex-Row md:heightScreen'>
        <GenerateSidebar />
        <OutputImages />
      </div>
    </GenerateContextProvider>
  );
}
