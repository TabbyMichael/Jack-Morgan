"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/hooks/useUserProfile";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { toast } from "sonner";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function BasicInfo() {
  const { profile, loading, error, updateProfile } = useUserProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    socialLinks: {
      instagram: "",
      twitter: "",
      facebook: "",
      youtube: ""
    }
  });

  // Update form data when profile is loaded
  useState(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || "",
        bio: profile.bio || "",
        location: profile.location || "",
        socialLinks: profile.socialLinks || {
          instagram: "",
          twitter: "",
          facebook: "",
          youtube: ""
        }
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id.includes(".")) {
      const [parent, child] = id.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    try {
      const file = e.target.files[0];
      const storageRef = ref(storage, `profile-pictures/${profile?.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      await updateProfile({ photoURL });
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to update profile picture");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading profile: {error.message}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
        
        <div className="space-y-8">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.photoURL || "/placeholder-avatar.jpg"} alt="Profile picture" />
              <AvatarFallback>{profile?.displayName?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-picture"
              />
              <Button variant="outline" onClick={() => document.getElementById("profile-picture")?.click()}>
                Change Picture
              </Button>
            </div>
          </div>

          {/* Basic Details Form */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input 
                id="displayName" 
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Your display name" 
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                className="resize-none"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Your location (optional)" 
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Social Media Links</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="socialLinks.instagram">Instagram</Label>
                <Input 
                  id="socialLinks.instagram" 
                  value={formData.socialLinks.instagram}
                  onChange={handleInputChange}
                  placeholder="Instagram username" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="socialLinks.twitter">Twitter</Label>
                <Input 
                  id="socialLinks.twitter" 
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder="Twitter username" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="socialLinks.facebook">Facebook</Label>
                <Input 
                  id="socialLinks.facebook" 
                  value={formData.socialLinks.facebook}
                  onChange={handleInputChange}
                  placeholder="Facebook profile URL" 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="socialLinks.youtube">YouTube</Label>
                <Input 
                  id="socialLinks.youtube" 
                  value={formData.socialLinks.youtube}
                  onChange={handleInputChange}
                  placeholder="YouTube channel URL" 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}
