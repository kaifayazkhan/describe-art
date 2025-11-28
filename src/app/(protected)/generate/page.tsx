import React from 'react';
import GenerateSidebar from './_components/Sidebar';
import GeneratedImages from './_components/GeneratedImages';
import GenerateContextProvider from '@/context/Generate';
import { getModels } from '@/apiUtils/models';

export default async function Generate() {
  const models = await getModels();

  return (
    <GenerateContextProvider>
      <div className='flex-Col h-full md:flex-Row md:heightScreen'>
        <GenerateSidebar models={models ?? []} />
        <GeneratedImages />
      </div>
    </GenerateContextProvider>
  );
}
