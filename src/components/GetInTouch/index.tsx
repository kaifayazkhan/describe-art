import Link from 'next/link';
import CTAButton from '../UI/CTAButton';

export default function GetInTouch() {
  return (
    <section className='py-8 sm:py-20 px-12 mb-12 rounded-xl flex-Col sm:flex-Row-between items-center gap-8 bg-secondaryBg'>
      <h2 className='text-semi-medium flex-1'>
        Create your account <br /> and start generating
      </h2>
      <div className='flex-Col w-full sm:flex-center sm:flex-row gap-6 flex-1'>
        <CTAButton className='flex-1 rounded-3xl' asChild>
          <Link href={'/generate'}>Get Started</Link>
        </CTAButton>
        <Link
          href='/contact'
          className='bg-white flex-1 text-black p-2 w-full rounded-3xl text-center hover:opacity-80'
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
