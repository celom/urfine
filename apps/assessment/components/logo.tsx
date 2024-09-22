'use client';

import { cn } from '@uptime/utils';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <div
      className={cn(
        'text-3xl flex justify-end items-end leading-6',
        props.className
      )}
    >
      <span className="font-extrabold tracking-tight scale-y-[0.9]">
        urfine
      </span>
      <Image src="/dot.svg" alt="dot" width={8} height={8} />
      <span className="tracking-tighter scale-y-[0.9]">com</span>
    </div>
  );
}
