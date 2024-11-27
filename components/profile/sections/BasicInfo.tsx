import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BasicInfo() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
        
        <div className="space-y-8">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Picture</Button>
          </div>

          {/* Basic Details Form */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" placeholder="Your display name" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                className="resize-none"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Your location (optional)" />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Social Media Links</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" placeholder="Instagram username" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" placeholder="Twitter username" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" placeholder="Facebook profile URL" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input id="youtube" placeholder="YouTube channel URL" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
