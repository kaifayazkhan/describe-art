import HeaderAndFooterLayout from '@/components/HeaderAndFooterLayout';
import React from 'react';
import ContactForm from './_components/ContactForm';

export default function Contact() {
  return (
    <HeaderAndFooterLayout>
      <div className='w-full flex justify-center items-center padding-x min-h-[90dvh]'>
        <section className='w-full md:w-2/5 md:min-w-[450px] max-w-xl p-4 md:p-8'>
          <h1 className='text-medium mb-4'>Send a Message</h1>
          <ContactForm />
        </section>
      </div>
    </HeaderAndFooterLayout>
  );
}
