"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Package, Heart, MapPin } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { format, isValid, parseISO } from "date-fns";

export default function Overview() {
  const { profile, loading, error } = useUserProfile();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading profile: {error.message}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMMM yyyy') : 'Unknown';
    } catch {
      return 'Unknown';
    }
  };

  const memberSince = formatDate(profile.createdAt);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Profile Summary */}
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.photoURL || "/placeholder-avatar.jpg"} alt="Profile picture" />
            <AvatarFallback>{profile.displayName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{profile.displayName}</h3>
            {profile.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                {profile.location}
              </div>
            )}
            <Badge variant="secondary">Member since {memberSince}</Badge>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Activity Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-2xl font-bold">{profile.orders?.length || 0}</span>
            <p className="text-sm text-muted-foreground">Orders Placed</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-bold">{profile.savedItems?.length || 0}</span>
            <p className="text-sm text-muted-foreground">Saved Items</p>
          </div>
        </div>
      </Card>

      {/* Recent Orders */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Orders</h3>
          <Button variant="link">View All Orders</Button>
        </div>
        <div className="space-y-4">
          {profile.orders?.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Package className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} items • £{order.total.toFixed(2)}
                  </p>
                </div>
              </div>
              <Badge variant="outline">{order.status}</Badge>
            </div>
          ))}
          {(!profile.orders || profile.orders.length === 0) && (
            <div className="text-center text-muted-foreground py-8">
              No orders yet
            </div>
          )}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Upcoming Events</h3>
          <Button variant="link">View All Events</Button>
        </div>
        <div className="space-y-4">
          {profile.events?.filter(event => {
            try {
              const eventDate = parseISO(event.date);
              return isValid(eventDate) && eventDate > new Date();
            } catch {
              return false;
            }
          })
            .slice(0, 2)
            .map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <CalendarDays className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.date)} • {event.location}
                    </p>
                  </div>
                </div>
                <Button size="sm">View Details</Button>
              </div>
            ))}
          {(!profile.events || profile.events.length === 0) && (
            <div className="text-center text-muted-foreground py-8">
              No upcoming events
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
