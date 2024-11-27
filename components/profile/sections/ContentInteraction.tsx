import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp, Bookmark, Clock } from "lucide-react";

export default function ContentInteraction() {
  const comments = [
    {
      id: 1,
      content: "Great performance last night! The energy was amazing!",
      post: "Summer Tour 2024 - London Show",
      date: "2 days ago",
      likes: 12,
    },
    {
      id: 2,
      content: "Can't wait for the new album to drop!",
      post: "New Album Announcement",
      date: "1 week ago",
      likes: 8,
    },
  ];

  const likedContent = [
    {
      id: 1,
      title: "Behind the Scenes - Studio Session",
      type: "Video",
      date: "March 15, 2024",
    },
    {
      id: 2,
      title: "Tour Announcement - European Dates",
      type: "News",
      date: "March 10, 2024",
    },
  ];

  const savedContent = [
    {
      id: 1,
      title: "Acoustic Performance - Unplugged Session",
      type: "Video",
      date: "March 5, 2024",
    },
    {
      id: 2,
      title: "Interview - Making of the New Album",
      type: "Article",
      date: "March 1, 2024",
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="comments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="comments" className="space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Comments</span>
          </TabsTrigger>
          <TabsTrigger value="liked" className="space-x-2">
            <ThumbsUp className="h-4 w-4" />
            <span>Liked</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="space-x-2">
            <Bookmark className="h-4 w-4" />
            <span>Saved</span>
          </TabsTrigger>
        </TabsList>

        {/* Comments Tab */}
        <TabsContent value="comments">
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{comment.post}</h3>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {comment.likes} Likes
                    </Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">Delete</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Liked Content Tab */}
        <TabsContent value="liked">
          <div className="space-y-4">
            {likedContent.map((content) => (
              <Card key={content.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{content.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{content.type}</Badge>
                      <span className="text-sm text-muted-foreground">
                        <Clock className="inline-block mr-1 h-3 w-3" />
                        {content.date}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Saved Content Tab */}
        <TabsContent value="saved">
          <div className="space-y-4">
            {savedContent.map((content) => (
              <Card key={content.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{content.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{content.type}</Badge>
                      <span className="text-sm text-muted-foreground">
                        <Clock className="inline-block mr-1 h-3 w-3" />
                        {content.date}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty States */}
      {comments.length === 0 && (
        <Card className="p-6 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Comments Yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your comments on posts will appear here
          </p>
        </Card>
      )}
    </div>
  );
}
