import React, { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/tailwind-merge';

type Props = ComponentProps<'button'> & {
  className?: string;
  asChild?: boolean;
};

export default function CTAButton({
  className,
  asChild = false,
  ...rest
}: Props) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(
        'w-full cta-btn p-2 flex justify-center items-center rounded-md hover:opacity-80 disabled:opacity-50',
        className,
      )}
      {...rest}
    />
  );
}
