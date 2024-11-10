"use client";

import Image from 'next/image';

interface LogoProps {
  type: 'youtube' | 'instagram';
  className?: string;
  size?: number;
}

export function Logo({ type, className = "", size = 20 }: LogoProps) {
  const src = type === 'youtube' 
    ? '/assets/images/logos/Youtube Logo.jpg'
    : '/assets/images/logos/instagram_logo.png';

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={type === 'youtube' ? 'YouTube' : 'Instagram'}
        width={size}
        height={size}
        className="rounded-sm object-contain"
      />
    </div>
  );
} 