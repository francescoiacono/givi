'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IconProps {
  href: string;
  src: string;
  alt: string;
  ariaLabel: string;
}

export const IconLink: React.FC<IconProps> = ({
  href,
  src,
  alt,
  ariaLabel,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <li>
      <Link
        href={href}
        passHref
        aria-label={ariaLabel}
        className='w-16 h-16 border border-gray-400 rounded-full flex items-center justify-center'
      >
        <Image src={src} height={32} width={32} alt={alt} />
      </Link>
    </li>
  );
};
