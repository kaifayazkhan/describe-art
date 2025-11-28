import Link from 'next/link';
import FormWrapper from '../_components/FormWrapper';
import SignUpForm from './_components/signUpForm';
import SignInWithGoogle from '@/app/(auth)/_components/SignInWithGoogle';

export default function SignUp() {
  return (
    <FormWrapper title='Create Account'>
      <SignUpForm />
      <SignInWithGoogle title='Sign up with Google' />
      <div className='text-center mt-4'>
        Already have an account?{' '}
        <Link href='/signIn' className='text-primaryCTA'>
          Login
        </Link>
      </div>
    </FormWrapper>
  );
}
