"use client";

import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Play } from 'lucide-react';
import Image from 'next/image';
import { getYouTubeVideos } from '@/lib/youtube';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  views: string;
  duration: string;
  date: string;
}

const HighlightReel = () => {
  const [highlights, setHighlights] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const videos = await getYouTubeVideos(4); // Get top 4 videos
        setHighlights(videos);
      } catch (error) {
        console.error('Error fetching highlights:', error);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Videos</h2>
          <p className="text-muted-foreground text-lg">
            Check out Jack&apos;s most popular content
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {highlights.map((highlight) => (
              <CarouselItem key={highlight.id} className="md:basis-1/2 lg:basis-1/3">
                <Card 
                  className="overflow-hidden group cursor-pointer"
                  onClick={() => window.open(`https://youtube.com/watch?v=${highlight.id}`, '_blank')}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={highlight.thumbnail}
                        alt={highlight.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded-md flex items-center">
                        <Clock className="w-4 h-4 text-white mr-1" />
                        <span className="text-white text-sm">{highlight.duration}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{highlight.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{highlight.views} views</span>
                          <span className="mx-2">•</span>
                          <span>{highlight.date}</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg line-clamp-2">{highlight.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {highlight.description}
                      </p>
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