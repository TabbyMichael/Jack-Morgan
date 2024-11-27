"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Youtube, Instagram, Menu, X, User, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { useCart } from "@/contexts/CartContext"; // Correct import
import { useMediaQuery } from "react-responsive";

const socialLinks = {
  youtube: "https://www.youtube.com/@JackMorgan_RLP",
  instagram: "https://www.instagram.com/jackmorgan_RLP/",
  patreon: "https://www.patreon.com/JackMorganRLP"
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart(); // Use the cart context
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

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
      <nav className="max-w-[85%] mx-auto pl-0 pr-2 sm:pl-0 sm:pr-3 lg:pl-0 lg:pr-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="font-bold flex items-center -ml-1">
            <span className={`${isMobile ? 'text-base' : 'text-lg'}`}>Jack Morgan RLP</span>
          </Link>

          {/* Desktop and Tablet Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-3 md:space-x-6">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavClick(item)}
                  className={`text-foreground/60 hover:text-foreground ${isTablet ? 'text-xs px-1.5 py-1' : 'text-sm px-3 py-1.5'}`}
                >
                  {item.label}
                </Button>
              ))}

              {/* Social Links */}
              <div className="flex items-center space-x-2 md:space-x-3">
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Logo type="youtube" size={isTablet ? 18 : 20} />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Logo type="instagram" size={isTablet ? 18 : 20} />
                </a>
                <Link href="/auth" className="text-muted-foreground hover:text-primary transition-colors">
                  <User className={`${isTablet ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                </Link>
                <Link href="/cart" className="relative">
                  <ShoppingCart className={`${isTablet ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-1.5 pb-2 space-y-0.5">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    onClick={() => handleNavClick(item)}
                    className="w-full text-left justify-start text-foreground/60 hover:text-foreground text-sm py-1.5"
                  >
                    {item.label}
                  </Button>
                ))}
                <div className="flex items-center justify-around py-3 border-t mt-2">
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Logo type="youtube" size={20} />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Logo type="instagram" size={20} />
                  </a>
                  <Link href="/auth" className="text-muted-foreground hover:text-primary transition-colors">
                    <User className="h-4 w-4" />
                  </Link>
                  <Link href="/cart" className="relative">
                    <ShoppingCart className="h-4 w-4" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navigation;
