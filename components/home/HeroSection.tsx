"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(3);
  const backgrounds = [
    {
      src: '/assets/images/brand/channels4_banner.jpg',
      alt: 'Jack Morgan RLP Banner',
      priority: true
    },
    {
      src: '/assets/images/hero/BG 1.jpg',
      alt: 'Jack Morgan RLP Featured Banner',
      priority: false
    },
    {
      src: '/assets/images/hero/BG 2.jpg',
      alt: 'Jack Morgan RLP Featured Banner',
      priority: false
    },
    {
      src: '/assets/images/hero/BG 3.jpg',
      alt: 'Jack Morgan RLP Featured Banner',
      priority: false
    },
    {
      src: '/assets/images/hero/BG 4.jpg',
      alt: 'Jack Morgan RLP Featured Banner',
      priority: false
    },
    {
      src: '/assets/images/hero/BG 5.jpg',
      alt: 'Jack Morgan RLP Featured Banner',
      priority: false
    },
    {
      src: '/assets/images/hero/BG 6.jpg',
      alt: 'Jack Morgan RLP Featured Banner',
      priority: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {backgrounds.map((bg, index) => (
        <div key={bg.src} className="absolute inset-0">
          <Image
            src={bg.src}
            alt={bg.alt}
            fill
            priority={bg.priority}
            className={cn(
              "object-cover transition-opacity duration-1000 brightness-110 contrast-110",
              currentBg === index ? "opacity-100" : "opacity-0"
            )}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" 
          /> 
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg"
        >
          Jack Morgan RLP
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 drop-shadow-md"
        >
          Comedy. Skateboarding. Business.<br />
          Living life on the edge and making it look good!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <a href="#latest-content">
              Watch Latest <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white"
            asChild
          >
            <a href="https://patreon.com/JackMorganRLP" target="_blank" rel="noopener noreferrer">
              Join the Party on Patreon
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-2 h-2 bg-white rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;