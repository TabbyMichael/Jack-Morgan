"use client";

import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';

const highlights = [
  {
    id: 1,
    title: "Epic Skateboarding Fails",
    category: "Skateboarding",
    thumbnail: "/assets/images/highlights/skateboarding-fail.jpg",
    views: "250K",
    date: "2 days ago"
  },
  {
    id: 2,
    title: "Stand-up Comedy Night",
    category: "Comedy",
    thumbnail: "/assets/images/highlights/comedy-night.jpg",
    views: "180K",
    date: "5 days ago"
  },
  {
    id: 3,
    title: "Business Tips for Creators",
    category: "Business",
    thumbnail: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&q=80",
    views: "120K",
    date: "1 week ago"
  },
  {
    id: 4,
    title: "Skatepark Tour 2024",
    category: "Skateboarding",
    thumbnail: "https://images.unsplash.com/photo-1621544402532-78c290378d82?auto=format&fit=crop&q=80",
    views: "90K",
    date: "1 week ago"
  }
];

const HighlightReel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Highlights
          </h2>
          <p className="text-muted-foreground text-lg">
            Catch up on the most exciting moments from Jack&apos;s world
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          onSelect={(event) => {
            const api = event.target as { selectedScrollSnap?: () => number };
            const selected = api.selectedScrollSnap?.();
            if (selected !== undefined) setCurrentSlide(selected);
          }}
        >
          <CarouselContent>
            {highlights.map((highlight) => (
              <CarouselItem key={highlight.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={highlight.thumbnail}
                        alt={highlight.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="mb-2">{highlight.category}</Badge>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {highlight.title}
                        </h3>
                        <div className="flex items-center text-sm text-white/80">
                          <span>{highlight.views} views</span>
                          <span className="mx-2">•</span>
                          <span>{highlight.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default HighlightReel; 