'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ContactInputs, ContactSchema } from '@/utils/FormSchema';
import InputBox from '@/components/UI/Input';
import CTAButton from '@/components/UI/CTAButton';
import SuccessModal from '@/components/UI/SuccessModal';
import TextArea from '@/components/UI/TextArea';
import sendMail from '@/apiUtils/sendMail';

export default function ContactForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInputs>({ resolver: zodResolver(ContactSchema) });

  const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
    try {
      const res = await sendMail(data);
      if (res?.status === 200 && res?.text === 'OK') {
        setShowSuccessModal(true);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=' flex-Col gap-3'>
        <InputBox
          register={register('name')}
          title='Name *'
          type='text'
          placeholder='Enter your name'
          error={errors.name?.message}
        />
        <InputBox
          register={register('email')}
          title='Email *'
          type='text'
          placeholder='Enter your email'
          error={errors.email?.message}
        />
        <InputBox
          register={register('subject')}
          title='Subject *'
          type='text'
          placeholder='Subject'
          error={errors.subject?.message}
        />
        <TextArea
          register={register('message')}
          title='Message *'
          placeholder='Enter your message'
          error={errors.message?.message}
        />
        <div className='my-4'>
          <CTAButton disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </CTAButton>
        </div>
      </form>
      {showSuccessModal && (
        <SuccessModal
          message='We will reach soon'
          path='/'
          btnText='Go Back to Home'
        />
      )}
    </>
  );
}
