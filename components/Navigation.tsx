"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Youtube, Instagram, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

const socialLinks = {
  youtube: "https://www.youtube.com/@JackMorgan_RLP",
  instagram: "https://www.instagram.com/jackmorgan_RLP/",
  patreon: "https://www.patreon.com/JackMorganRLP"
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/content", label: "Content" },
    { href: "#merch", label: "Merch", section: 'merch' },
    { href: "#events", label: "Events", section: 'events' },
  ];

  const handleNavClick = (item: { href: string, label: string, section?: string }) => {
    setIsOpen(false);
    
    if (item.section) {
      if (pathname === '/') {
        scrollToSection(item.section);
      } else {
        window.location.href = `/#${item.section}`;
      }
    } else {
      window.location.href = item.href;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            RLP
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => handleNavClick(item)}
                className="text-foreground/60 hover:text-foreground"
              >
                {item.label}
              </Button>
            ))}

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Logo type="youtube" size={24} />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Logo type="instagram" size={24} />
              </a>
              <Link
                href="/auth"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="bg-background px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left justify-start"
                >
                  {item.label}
                </Button>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t">
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Logo type="youtube" size={24} />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Logo type="instagram" size={24} />
                </a>
                <Button asChild className="w-full">
                  <a
                    href={socialLinks.patreon}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Patreon
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;