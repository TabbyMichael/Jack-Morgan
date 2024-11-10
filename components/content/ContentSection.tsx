"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Calendar, Clock, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import { getYouTubeVideos } from '@/lib/youtube';

// Updated categories to match Jack's content
const categories = [
  { id: 'all', label: 'All Content' },
  { id: 'podcast', label: 'Red Leather Pod' },
  { id: 'society', label: 'Society' },
  { id: 'business', label: 'Business' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'conspiracy', label: 'Conspiracy' },
  { id: 'other', label: 'Other' }
];

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

const ContentSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedVideos = await getYouTubeVideos(24);
        setVideos(fetchedVideos);
      } catch (error: any) {
        console.error('Error fetching videos:', error);
        setError(error.message || 'Failed to load videos. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredContent = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category.toLowerCase() === selectedCategory);

  return (
    <section className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Content Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore Jack&apos;s world of Red Leather Pod, society discussions, and business insights.
          New content added regularly.
        </p>
      </div>

      {/* Category Tabs - Always show these */}
      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="data-[state=active]:bg-primary"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Content Grid - Only show when not loading and no error */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((video) => (
            <Card 
              key={video.id} 
              className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
            >
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded-md flex items-center">
                  <Clock className="w-4 h-4 text-white mr-1" />
                  <span className="text-white text-sm">{video.duration}</span>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="capitalize">
                    {video.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{video.views}</span>
                    <span>•</span>
                    <span>{video.date}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default ContentSection;