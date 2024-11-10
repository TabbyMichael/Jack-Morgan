"use client";

import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Youtube, Instagram, Twitter, Send, Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from "sonner";
import { scrollToSection } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [email, setEmail] = useState('');
  const pathname = usePathname();

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
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About RLP</h3>
            <p className="text-gray-400 mb-4">
              Join me on this wild ride through comedy, skateboarding, and business. 
              Let&apos;s make some memories and have a blast doing it!
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://youtube.com/@JackMorgan_RLP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com/jackmorgan_RLP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/content" className="text-gray-400 hover:text-white transition-colors">
                  Latest Videos
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('events')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Upcoming Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('merch')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Merch Store
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Join the Party!</h3>
            <p className="text-gray-400 mb-4">
              Subscribe for exclusive content, early access, and behind-the-scenes fun!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" size="icon" variant="outline">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Jack Morgan RLP. A man with no bills is a rich man.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;