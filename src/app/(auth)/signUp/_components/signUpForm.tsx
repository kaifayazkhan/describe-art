'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signUpSchema, SingUpInputs } from '@/utils/FormSchema';
import InputBox from '@/components/UI/Input';
import CTAButton from '@/components/UI/CTAButton';
import SuccessModal from '@/components/UI/SuccessModal';
import { useState } from 'react';
import { authClient } from '@/utils/auth-client';

export default function SignUpForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SingUpInputs>({ resolver: zodResolver(signUpSchema) });

  const onSubmit: SubmitHandler<SingUpInputs> = async (data) => {
    try {
      const res = await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: '/generate',
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );

      if (res.data) {
        setShowSuccessModal(true);
        reset();
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
          title='Name'
          type='text'
          placeholder='Enter your name'
          error={errors.name?.message}
        />
        <InputBox
          register={register('email')}
          title='Email'
          type='text'
          placeholder='Enter your email'
          error={errors.email?.message}
        />
        <InputBox
          register={register('password')}
          title='Password'
          type='password'
          placeholder='Enter your password'
          error={errors.password?.message}
        />
        <InputBox
          register={register('confirmPassword')}
          title='Confirm Password'
          type='password'
          placeholder='Confirm your password'
          error={errors.confirmPassword?.message}
        />
        <div className='my-4'>
          <CTAButton disabled={isSubmitting}>
            {isSubmitting ? 'Creating your account...' : 'Create'}
          </CTAButton>
        </div>
      </form>
      {showSuccessModal && (
        <SuccessModal message='Account created successfully and email verification link is sent to your email.' />
      )}
    </>
  );
}
