import Link from 'next/link';
import ForgotPasswordForm from './_components/forgotPasswordForm';
import FormWrapper from '@/app/(auth)/_components/FormWrapper';

export default function ForgotPassword() {
  return (
    <FormWrapper title={'Password Reset'}>
      <ForgotPasswordForm />
      <div className='text-center'>
        <Link href='/signIn' className='text-primaryCTA'>
          Back to login
        </Link>
      </div>
    </FormWrapper>
  );
}
