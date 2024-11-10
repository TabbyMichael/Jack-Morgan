"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { Play, Clock } from 'lucide-react';

const contentCategories = [
  { value: "all", label: "All Content" },
  { value: "comedy", label: "Comedy" },
  { value: "skateboarding", label: "Skateboarding" },
  { value: "business", label: "Business" },
];

const contentItems = [
  {
    id: 1,
    title: "How to Kickflip Like a Pro",
    category: "skateboarding",
    thumbnail: "https://images.unsplash.com/photo-1621544402532-78c290378d82?auto=format&fit=crop&q=80",
    duration: "12:34",
    date: "3 days ago",
  },
  {
    id: 2,
    title: "Stand-up Comedy Special 2024",
    category: "comedy",
    thumbnail: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80",
    duration: "45:00",
    date: "1 week ago",
  },
  {
    id: 3,
    title: "Creator Economy Masterclass",
    category: "business",
    thumbnail: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&q=80",
    duration: "28:15",
    date: "2 weeks ago",
  },
  // Add more content items as needed
];

const LatestContent = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredContent = contentItems.filter(
    item => activeTab === "all" || item.category === activeTab
  );

  return (
    <section className="py-16 bg-background" id="latest-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Content</h2>
          <p className="text-muted-foreground text-lg">
            Watch the newest videos across comedy, skateboarding, and business
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center mb-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <Card key={item.id} className="overflow-hidden group cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative aspect-video">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded-md flex items-center">
                        <Clock className="w-4 h-4 text-white mr-1" />
                        <span className="text-white text-sm">{item.duration}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{item.category}</Badge>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LatestContent; 