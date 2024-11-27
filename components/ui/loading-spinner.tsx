"use client";

import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <motion.div
        className="relative w-24 h-24"
      >
        {/* Outer spinning circle */}
        <motion.div
          className="absolute inset-0 border-2 border-white/30 rounded-full"
          style={{
            borderTopColor: 'white',
            borderRightColor: 'white',
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1]
          }}
        />
        
        {/* Inner subtle glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
          animate={{
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};
