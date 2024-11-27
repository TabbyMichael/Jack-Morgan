import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Package, Heart, MapPin } from "lucide-react";

export default function Overview() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Profile Summary */}
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">John Doe</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              London, UK
            </div>
            <Badge variant="secondary">Member since 2024</Badge>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Activity Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-2xl font-bold">12</span>
            <p className="text-sm text-muted-foreground">Orders Placed</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl font-bold">5</span>
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
          {[1, 2, 3].map((order) => (
            <div key={order} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Package className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Order #{order}23456</p>
                  <p className="text-sm text-muted-foreground">2 items • £49.99</p>
                </div>
              </div>
              <Badge variant="outline">Delivered</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Upcoming Events</h3>
          <Button variant="link">View All Events</Button>
        </div>
        <div className="space-y-4">
          {[1, 2].map((event) => (
            <div key={event} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Summer Concert {event}</p>
                  <p className="text-sm text-muted-foreground">July 1{event}, 2024 • London</p>
                </div>
              </div>
              <Button size="sm">View Details</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
