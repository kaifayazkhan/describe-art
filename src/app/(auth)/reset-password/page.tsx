import Link from 'next/link';
import ResetPasswordForm from './_components/ResetPasswordForm';
import { Suspense } from 'react';
import FormWrapper from '@/app/(auth)/_components/FormWrapper';

export default function ResetPassword() {
  return (
    <FormWrapper title='Set new password'>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
      <div className='text-center'>
        <Link href='/sign-in' className='text-primaryCTA'>
          Back to login
        </Link>
      </div>
    </FormWrapper>
  );
}
