import Link from 'next/link';
import Image from 'next/image';
import CTAButton from '../UI/CTAButton';

export default function Banner() {
  return (
    <>
      <div className='mt-6 relative hidden md:flex items-center h-[85dvh] overflow-hidden w-full '>
        <div className='relative flex-Col gap-6 z-[10] ml-20'>
          <div>
            {' '}
            <h1 className='text-large uppercase'>Generate Your Ideas Into</h1>
            <h2 className='text-large uppercase'>Stunning Visuals</h2>
          </div>
          <p>
            Introducing Describe Art, the Generative AI image <br /> Brings your
            ideas to life with perfectly matched and unique visuals.
          </p>
          <CTAButton className='max-w-fit min-w-[180px] rounded-3xl' asChild>
            <Link href='/generate'>Get Started</Link>
          </CTAButton>
        </div>
        <Image
          src='/assets/home-bg.webp'
          alt='Home background'
          fill
          className='object-fill mix-blend-overlay hidden md:block'
        />
      </div>
      <div className='mt-6 relative block md:hidden flex-Col gap-3'>
        <div>
          <h1 className='text-large uppercase'>Generate Your Ideas Into</h1>
          <h2 className='text-large uppercase'>Stunning Visuals</h2>
        </div>
        <p>
          Introducing Describe Art, the Generative AI image brings your ideas to
          life with perfectly matched and unique visuals.
        </p>
        <CTAButton className='max-w-fit min-w-[180px] rounded-3xl' asChild>
          <Link href='/generate'>Get Started</Link>
        </CTAButton>
        <Image
          src='/assets/home-bg-mobile.webp'
          width={800}
          height={400}
          alt='Home Image'
          className='mt-4'
        />
      </div>
    </>
  );
}
