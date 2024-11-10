"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, Lock, Calendar, Clock, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

// Content categories and their respective colors
const categories = [
  { id: 'all', label: 'All Content' },
  { id: 'comedy', label: 'Comedy', color: 'bg-pink-500' },
  { id: 'skateboarding', label: 'Skateboarding', color: 'bg-blue-500' },
  { id: 'business', label: 'Business', color: 'bg-green-500' },
  { id: 'exclusive', label: 'Exclusive', color: 'bg-purple-500' },
];

// Sample content data (replace with your actual content)
const contentItems = [
  {
    id: 1,
    title: "How to Kickflip Like a Pro",
    description: "Master the fundamental skateboarding trick with detailed breakdown and tips.",
    thumbnail: "https://images.unsplash.com/photo-1621544402532-78c290378d82?auto=format&fit=crop&q=80",
    category: "skateboarding",
    duration: "12:34",
    date: "2024-02-20",
    likes: 1234,
    isPremium: false,
  },
  {
    id: 2,
    title: "Stand-up Comedy Special 2024",
    description: "An hour of non-stop laughter with my latest material.",
    thumbnail: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80",
    category: "comedy",
    duration: "45:00",
    date: "2024-02-15",
    likes: 2567,
    isPremium: true,
  },
  {
    id: 3,
    title: "Business Mindset Masterclass",
    description: "Learn the key principles that helped me build successful ventures.",
    thumbnail: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&q=80",
    category: "business",
    duration: "28:15",
    date: "2024-02-10",
    likes: 1890,
    isPremium: true,
  },
  // Add more content items as needed
];

const ContentSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredContent = selectedCategory === 'all' 
    ? contentItems 
    : contentItems.filter(item => item.category === selectedCategory);

  return (
    <section className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Content Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dive into my world of comedy, skateboarding, and business insights. 
          Premium members get access to exclusive content and early releases.
        </p>
      </div>

      {/* Category Tabs */}
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="relative aspect-video">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {item.isPremium && (
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="gap-1">
                    <Lock className="h-3 w-3" />
                    Premium
                  </Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  Watch Now
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {item.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {item.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(item.date).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  {item.likes.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium CTA */}
      <div className="mt-16 text-center">
        <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              Want Access to Premium Content?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join our premium membership to unlock exclusive content, early access to videos, 
              and behind-the-scenes footage.
            </p>
            <Button size="lg" className="gap-2">
              <Lock className="h-4 w-4" />
              Become a Premium Member
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContentSection; 