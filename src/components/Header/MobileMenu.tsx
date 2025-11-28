import Link from 'next/link';
import { headerData } from '@/constants/data';

export default function MobileMenu({ isOpen }: { isOpen: Boolean }) {
  return (
    <div
      className={` bg-white rounded-lg absolute -z-10 transition-all duration-300 ease-out min-w-[220px] top-24 drop-shadow-2xl  ${
        isOpen ? 'right-8 block' : 'hidden'
      }`}
    >
      <ul className='flex-Col justify-center text-black gap-1 py-2'>
        {headerData?.map(({ id, title, link }) => {
          return (
            <li key={id} className=' cursor-pointer '>
              <Link
                href={link}
                className='flex justify-between  p-3 hover:bg-gray-100'
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
