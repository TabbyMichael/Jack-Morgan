"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds

    return () => clearTimeout(timer);
  }, [pathname, setIsLoading]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.45, 0, 0.55, 1]
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
