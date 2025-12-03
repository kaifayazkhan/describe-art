'use client';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  ForgotPasswordEmailInput,
  forgotPasswordEmailSchema,
} from '@/utils/FormSchema';
import InputBox from '@/components/UI/Input';
import CTAButton from '@/components/UI/CTAButton';
import SuccessModal from '../../../../components/UI/SuccessModal';
import { authClient } from '@/utils/auth-client';

export default function ForgotPasswordForm() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordEmailInput>({
    resolver: zodResolver(forgotPasswordEmailSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordEmailInput> = async (data) => {
    try {
      // const res = (await forgotPassword(data)) as AxiosResponse<any>;
      // if (res.status === 200) {
      //   setShowSuccessModal(true);
      // } else {
      //   toast.error('User does not exist with this email');
      // }

      const res = await authClient.requestPasswordReset(
        {
          email: data.email,
          redirectTo: '/reset-password',
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
          register={register('email')}
          title='Email'
          type='text'
          placeholder='Enter your email'
          error={errors.email?.message}
        />
        <div className='my-4'>
          <CTAButton disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Submit'}
          </CTAButton>
        </div>
      </form>
      {showSuccessModal && (
        <SuccessModal message='Password Reset Link has been sent to your email.' />
      )}
    </>
  );
}
