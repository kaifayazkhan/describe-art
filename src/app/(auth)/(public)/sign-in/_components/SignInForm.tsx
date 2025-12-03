'use client';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signInSchema, SingInInputs } from '@/utils/FormSchema';
import InputBox from '@/components/UI/Input';
import CTAButton from '@/components/UI/CTAButton';
import { authClient } from '@/utils/auth-client';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SingInInputs>({ resolver: zodResolver(signInSchema) });

  const onSubmit: SubmitHandler<SingInInputs> = async (data) => {
    try {
      const res = await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: '/generate',
        },
        {
          onError: async (ctx) => {
            if (ctx.error.code === 'EMAIL_NOT_VERIFIED') {
              toast(
                'Please verify your email. Email verification link is sent on your address.',
              );
              await authClient.sendVerificationEmail({
                email: data.email,
                callbackURL: '/generate',
              });
              return;
            }
            toast.error(ctx.error.message);
          },
        },
      );
      if (res.data) {
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=' flex-Col gap-3'>
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
      <div className='text-right'>
        <Link href='/forgot-password' className='mt-4'>
          Forgot your Password?
        </Link>
      </div>
      <div className='my-4'>
        <CTAButton disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Login'}
        </CTAButton>
      </div>
    </form>
  );
}
