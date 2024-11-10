"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Play, Clock, ThumbsUp } from 'lucide-react';
import { getYouTubeVideos } from '@/lib/youtube';

const contentCategories = [
  { value: "all", label: "All Content" },
  { value: "podcast", label: "Red Leather Pod" },
  { value: "society", label: "Society" },
  { value: "business", label: "Business" },
  { value: "relationships", label: "Relationships" },
  { value: "conspiracy", label: "Conspiracy" },
  { value: "other", label: "Other" }
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

const LatestContent = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const videos = await getYouTubeVideos(12);
        setVideos(videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredContent = videos.filter(
    video => activeTab === "all" || video.category.toLowerCase() === activeTab
  );

  return (
    <section className="py-16 bg-background" id="latest-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Content</h2>
          <p className="text-muted-foreground text-lg">
            Watch Jack&apos;s newest videos and podcasts
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
            {contentCategories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                onClick={() => setActiveTab(category.value)}
                className="px-4 py-2"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-gray-200 animate-pulse" />
                      <div className="p-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredContent.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No videos found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((video) => (
                  <Card 
                    key={video.id} 
                    className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
                  >
                    <CardContent className="p-0">
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
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant="secondary" 
                            className="capitalize"
                          >
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LatestContent;