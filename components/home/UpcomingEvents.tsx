"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { scrollToSection } from "@/lib/utils";

const events = [
  {
    id: 1,
    title: "Comedy Night Live",
    date: "March 15, 2024",
    time: "8:00 PM",
    location: "The Laugh Factory, LA",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80",
    category: "Comedy",
    attendees: 120,
    status: "Selling Fast"
  },
  {
    id: 2,
    title: "Skate Park Opening",
    date: "March 20, 2024",
    time: "2:00 PM",
    location: "Venice Beach Skatepark",
    image: "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&q=80",
    category: "Skateboarding",
    attendees: 200,
    status: "Free Entry"
  },
  {
    id: 3,
    title: "Business Workshop",
    date: "March 25, 2024",
    time: "10:00 AM",
    location: "Digital Hub, SF",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    category: "Business",
    attendees: 50,
    status: "Limited Seats"
  }
];

const UpcomingEvents = () => {
  return (
    <section id="events" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground text-lg">
            Join me at these exciting upcoming events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4">
                    {event.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <Badge variant="secondary">{event.status}</Badge>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      {event.attendees} attending
                    </div>
                  </div>
                  <Button className="w-full group-hover:bg-primary/90">
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground"
            onClick={() => scrollToSection('events')}
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents; 