import Link from 'next/link';
import SignInForm from './_components/signInForm';
import FormWrapper from '@/app/(auth)/_components/FormWrapper';
import SignInWithGoogle from '@/app/(auth)/_components/SignInWithGoogle';

export default function SignIn() {
  return (
    <FormWrapper title={'Sign In'}>
      <SignInForm />
      <SignInWithGoogle title='Sign in with Google' />
      <div className='text-center mt-4'>
        Don't have an account?{' '}
        <Link href='/signUp' className='text-primaryCTA'>
          Create Account
        </Link>
      </div>
    </FormWrapper>
  );
}
