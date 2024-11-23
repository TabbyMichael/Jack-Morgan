"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { scrollToSection } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

const merchItems = [
  {
    id: 1,
    name: "Classic Logo Tee",
    price: 29.99,
    image: "/assets/images/merch/logo-tee.jpg",
    badge: "Best Seller",
    description: "Premium cotton t-shirt with embroidered logo"
  },
  {
    id: 2,
    name: "Skater Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80",
    badge: "New Arrival",
    description: "Comfortable hoodie perfect for skating sessions"
  },
  {
    id: 3,
    name: "Business Cap",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80",
    badge: "Limited Edition",
    description: "Stylish cap for the business-minded rebel"
  }
];

const FeaturedMerch = () => {
  const { addToCart } = useCart();

  return (
    <section id="merch" className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Merch</h2>
          <p className="text-muted-foreground text-lg">
            Rep the lifestyle with our exclusive merchandise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <Link href={`/product/${item.id}`} className="cursor-pointer">
                  <div className="relative aspect-square">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.badge && (
                      <Badge className="absolute top-4 right-4 z-10">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${item.price}</span>
                      <Button
                        className="group-hover:bg-primary/90"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({ ...item, quantity: 1 });
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground"
            onClick={() => scrollToSection('merch')}
          >
            View All Merchandise
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMerch; 