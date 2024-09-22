'use client';

import { cn } from '@urfine/utils';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <div
      className={cn(
        'flex items-end justify-end text-3xl leading-6',
        props.className,
      )}
    >
      <span className="scale-y-[0.9] font-extrabold tracking-tight">
        urfine
      </span>
      <Image src="/dot.svg" alt="dot" width={8} height={8} />
      <span className="scale-y-[0.9] tracking-tighter">com</span>
    </div>
  );
}
