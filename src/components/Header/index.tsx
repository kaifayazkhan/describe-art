'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CTAButton from '../UI/CTAButton';
import { headerData } from '@/constants/data';
import Hamburger from './Hamburger';
import { cn } from '@/utils/tailwind-merge';
import { authClient } from '@/utils/auth-client';
import { Session } from '@/utils/auth';

export default function Header({ padding }: { padding?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  const handleLogout = async () => {
    try {
      const { data } = await authClient.signOut();
      if (data?.success) {
        setSession(null);
        router.push('/sign-in');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Logout failed', error.message);
      toast.error('Failed to logout');
    }
  };

  useEffect(() => {
    (async () => {
      const res = await authClient.getSession();
      if (!res.data) {
        return;
      }
      setSession(res.data);
    })();
  }, []);

  return (
    <header
      className={cn(
        `bg-black w-full sticky top-0 z-30 left-0 right-0 ${padding ? padding : 'padding-x'}`,
      )}
    >
      <div className='h-20 flex-Row-between'>
        <Link href='/' className='flex-center h-full gap-1'>
          <Image
            src='/assets/logo-1.webp'
            width={50}
            height={100}
            alt='Logo'
            fetchPriority='high'
          />
          <span className='text-xl font-semibold hidden sm:block'>
            Describe Art
          </span>
        </Link>
        <nav className='hidden md:flex items-center gap-8'>
          <ul className='flex items-center gap-8 '>
            {headerData?.map(({ id, title, link }) => (
              <li
                key={id}
                className={`hover:text-primaryCTA ${
                  pathname == link ? 'text-primaryCTA' : ''
                }  transition-all duration-200 flex items-center gap-2 cursor-pointer relative`}
              >
                <Link href={link}>{title}</Link>
              </li>
            ))}
            {session ? (
              <>
                <li
                  className={`hover:text-primaryCTA ${
                    pathname == '/gallery' ? 'text-primaryCTA' : ''
                  }  transition-all duration-200 flex items-center gap-2 cursor-pointer relative`}
                >
                  <Link href='/gallery'>Gallery</Link>
                </li>
                <li>
                  <CTAButton
                    onClick={handleLogout}
                    className='rounded-3xl px-5'
                  >
                    Logout
                  </CTAButton>
                </li>
              </>
            ) : (
              <li>
                <CTAButton className='rounded-3xl px-5' asChild>
                  <Link href={'/sign-in'}>Login</Link>
                </CTAButton>
              </li>
            )}
          </ul>
        </nav>

        <div className='flex md:hidden flex-center gap-3'>
          <div className='md:hidden'>
            {session ? (
              <CTAButton onClick={handleLogout} className='rounded-3xl px-5'>
                Logout
              </CTAButton>
            ) : (
              <CTAButton className='rounded-3xl px-5' asChild>
                <Link href={'/sign-in'}>Login</Link>
              </CTAButton>
            )}
          </div>
          <Hamburger />
        </div>
      </div>
    </header>
  );
}
