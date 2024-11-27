"use client";

import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Youtube, Instagram, Twitter, Send, Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from "sonner";
import { scrollToSection } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const [email, setEmail] = useState('');
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    toast.success("Thanks for subscribing! Check your email to confirm.");
    setEmail('');
  };

  const handleNavClick = (section: string) => {
    if (pathname === '/') {
      scrollToSection(section);
    } else {
      window.location.href = `/#${section}`;
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-6 md:pt-8 pb-4">
      <div className="max-w-[85%] mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {/* About Section */}
          <div className={`${isMobile ? 'text-center' : ''}`}>
            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">About RLP</h3>
            <p className="text-gray-400 mb-3 text-xs md:text-sm">
              Join me on this wild ride through comedy, skateboarding, and business. 
              Let&apos;s make some memories and have a blast doing it!
            </p>
            <div className={`flex space-x-3 ${isMobile ? 'justify-center' : ''}`}>
              <a 
                href="https://youtube.com/@JackMorgan_RLP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:opacity-80 transition-opacity"
              >
                <Logo type="youtube" size={isMobile ? 20 : 24} />
              </a>
              <a 
                href="https://instagram.com/jackmorgan_RLP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:opacity-80 transition-opacity"
              >
                <Logo type="instagram" size={isMobile ? 20 : 24} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`${isMobile ? 'text-center' : ''}`}>
            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">Quick Links</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/content" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">
                  Latest Videos
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('events')}
                  className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                >
                  Upcoming Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('merch')}
                  className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                >
                  Merch Store
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className={`${isMobile ? 'text-center' : ''}`}>
            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">Support</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={`${isMobile ? 'text-center' : ''}`}>
            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3">Newsletter</h3>
            <p className="text-gray-400 mb-3 text-xs md:text-sm">
              Subscribe to get updates on new content and merchandise!
            </p>
            <form onSubmit={handleSubscribe} className={`flex ${isMobile ? 'flex-col space-y-1.5' : 'space-x-1.5'}`}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-gray-800 border-gray-700 text-white text-xs md:text-sm h-8 ${isMobile ? 'w-full' : 'flex-grow'}`}
                required
              />
              <Button 
                type="submit" 
                variant="secondary"
                className={`${isMobile ? 'w-full' : ''} whitespace-nowrap h-8 text-xs md:text-sm`}
              >
                Subscribe <Send className="ml-1.5 h-3 w-3" />
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t border-gray-800 pt-4 ${isMobile ? 'text-center' : 'flex justify-between items-center'}`}>
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} RLP. All rights reserved.
          </p>
          <p className={`text-gray-400 text-xs flex items-center ${isMobile ? 'justify-center mt-2' : ''}`}>
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by Jack Morgan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;