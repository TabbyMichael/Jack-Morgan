"use client";

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Calendar,
  Tag,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  publishDate: Date;
  author: string;
  tags: string[];
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  status: z.string(),
  publishDate: z.string(),
  tags: z.array(z.string()),
});

export default function ContentPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      status: 'draft',
      publishDate: new Date().toISOString().split('T')[0],
      tags: [],
    },
  });

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [searchQuery, statusFilter, posts]);

  const fetchPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(postsQuery);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishDate: doc.data().publishDate?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Post[];
      setPosts(postsData);
      setFilteredPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const tagsQuery = query(collection(db, 'tags'));
      const snapshot = await getDocs(tagsQuery);
      const tags = snapshot.docs.map(doc => doc.data().name);
      setAvailableTags(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    try {
      if (selectedPost) {
        // Update existing post
        const postRef = doc(db, 'posts', selectedPost.id);
        await updateDoc(postRef, {
          ...data,
          updatedAt: new Date(),
        });
      } else {
        // Create new post
        await addDoc(collection(db, 'posts'), {
          ...data,
          author: 'Admin', // Replace with actual user
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      await fetchPosts();
      setIsAddPostOpen(false);
      setIsEditPostOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const deletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        await fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="space-y-8 p-8 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-black">Content Management</h1>
      </div>

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList className="w-full sm:w-auto flex justify-between sm:justify-start">
          <TabsTrigger value="pages" className="flex-1 sm:flex-none">Pages</TabsTrigger>
          <TabsTrigger value="media" className="flex-1 sm:flex-none">Media</TabsTrigger>
          <TabsTrigger value="blog" className="flex-1 sm:flex-none">Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pages</CardTitle>
              <CardDescription>Manage your website pages</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Page cards will go here */}
                <Card>
                  <CardHeader>
                    <CardTitle>Home Page</CardTitle>
                    <CardDescription>Main landing page</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Last edited: 2 days ago</p>
                  </CardContent>
                </Card>
                {/* Add more page cards */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>Manage your media files</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* Media items will go here */}
                <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                  <p className="text-sm text-gray-500">Upload Media</p>
                </div>
                {/* Add more media items */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage your blog content</CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Blog post cards will go here */}
                <Card>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">Sample Blog Post</CardTitle>
                    <CardDescription className="line-clamp-2">
                      This is a sample blog post description that might be a bit longer...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Published: 3 days ago</p>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
                {/* Add more blog post cards */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Post Dialog */}
      <Dialog
        open={isAddPostOpen || isEditPostOpen}
        onOpenChange={() => {
          setIsAddPostOpen(false);
          setIsEditPostOpen(false);
          setSelectedPost(null);
          form.reset();
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {isEditPostOpen ? 'Edit Post' : 'Create New Post'}
            </DialogTitle>
            <DialogDescription>
              {isEditPostOpen
                ? 'Edit your blog post content and settings'
                : 'Create a new blog post'}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Post title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Brief description of the post"
                        rows={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your post content here..."
                        rows={10}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publishDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publish Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddPostOpen(false);
                    setIsEditPostOpen(false);
                    setSelectedPost(null);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditPostOpen ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
