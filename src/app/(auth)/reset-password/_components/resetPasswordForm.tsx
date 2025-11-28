'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { resetPasswordSchema, ResetPasswordInput } from '@/utils/FormSchema';
import InputBox from '@/components/UI/Input';
import CTAButton from '@/components/UI/CTAButton';
import { authClient } from '@/utils/auth-client';
import { useEffect } from 'react';

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const params = useSearchParams();
  const router = useRouter();

  const token = params.get('token');

  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
    try {
      const res = await authClient.resetPassword(
        {
          newPassword: data.password,
          token: token!,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );

      if (res.data) {
        toast.success('Your password has been updated successfully.');
        router.push('/signIn');
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push('/signIn');
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=' flex-Col gap-3'>
        <InputBox
          register={register('password')}
          title='Password'
          type='password'
          placeholder='Set new password here'
          error={errors.password?.message}
        />
        <div className='my-4'>
          <CTAButton disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Submit'}
          </CTAButton>
        </div>
      </form>
    </>
  );
}
