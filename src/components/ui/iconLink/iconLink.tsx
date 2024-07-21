'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IconProps {
  href: string;
  src: string;
  alt: string;
  ariaLabel: string;
  openInNewTab?: boolean;
}

export const IconLink: React.FC<IconProps> = ({
  href,
  src,
  alt,
  ariaLabel,
  openInNewTab
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Link
      href={href}
      passHref
      aria-label={ariaLabel}
      className='w-16 h-16 flex items-center justify-center'
      target={openInNewTab ? '_blank' : '_self'}
    >
      <Image src={src} height={32} width={32} alt={alt} />
    </Link>
  );
};
