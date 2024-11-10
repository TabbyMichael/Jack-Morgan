"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Keyboard as Skateboard, Mic, Heart, Youtube, Instagram } from 'lucide-react';
import Image from 'next/image';

const AboutContent = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Jack Morgan RLP</h1>
        <p className="text-muted-foreground text-lg">
          Entrepreneur, Content Creator, Skateboarder, Comedian, and occasionally a Philosopher
          (but only after coffee)
        </p>
      </div>

      {/* Origin Story */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Car className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-semibold">The RLP Origin Story</h2>
        </div>
        <p className="text-lg mb-6">
          Picture this: A 1985 Cadillac with red leather interior that screamed &quot;I make questionable life choices, 
          but I do it with style.&quot; That&apos;s where RLP (Red Leather Podcast) was born. Two weeks into the 
          YouTube journey, the Cadillac decided to retire (it wasn&apos;t consulted on this decision), but the name 
          stuck around as a reminder that sometimes the best stories start with a breakdown.
        </p>
        <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
          <Image
            src="https://images.unsplash.com/photo-1632245889029-e406faaa34cd?auto=format&fit=crop&q=80"
            alt="Vintage Cadillac with red interior"
            fill
            className="object-cover"
          />
        </div>
      </Card>

      {/* Skate House */}
      <Card className="p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Skateboard className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-semibold">The Skate House Philosophy</h2>
        </div>
        <p className="text-lg mb-6">
          Skate House (SH) was born from a simple idea: What if we lived to skate instead of skating to live? 
          It&apos;s where a bunch of skateboarders decided to share a roof so they could work less and skate more. 
          Think of it as a commune, but with more kickflips and significantly more bruises.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 italic text-xl mb-6">
          &quot;Work to Live vs Live to Work&quot;
          <p className="text-sm text-muted-foreground mt-2">- The Skate House Mantra</p>
        </blockquote>
      </Card>

      {/* The Man, The Myth */}
      <Card className="p-8 mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Mic className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-semibold">The Man Behind the Madness</h2>
        </div>
        <p className="text-lg mb-6">
          At the end of the day, Jack&apos;s just a regular dude who happens to be funny... and entrepreneurial... 
          and good at skateboarding... okay, maybe not so regular. But he does put his pants on one leg at a time 
          (unless he&apos;s trying to film a viral video, then all bets are off).
        </p>
        <div className="flex items-center justify-center gap-6">
          <Button variant="outline" className="gap-2" asChild>
            <a href="https://youtube.com/@JackMorgan_RLP" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-5 w-5" />
              YouTube
            </a>
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <a href="https://instagram.com/jackmorgan_RLP" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
          </Button>
        </div>
      </Card>

      {/* Join the Community */}
      <Card className="p-8 text-center bg-primary/5 border-primary/20">
        <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Join the RLP Family</h2>
        <p className="text-muted-foreground mb-6">
          Whether you&apos;re here for the laughs, the skateboarding tips, or the business insights 
          (or just to see if that Cadillac ever makes a comeback), there&apos;s a place for you in our community.
        </p>
        <Button size="lg" className="gap-2">
          Subscribe to the Channel
        </Button>
      </Card>
    </div>
  );
};

export default AboutContent;