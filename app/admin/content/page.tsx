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
    <div className="space-y-6 pt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black">Content Management</h1>
        <Button onClick={() => setIsAddPostOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>
            Manage your blog posts and content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-gray-500">{post.excerpt}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : post.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      {post.publishDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(post.updatedAt, { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedPost(post);
                            setIsEditPostOpen(true);
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deletePost(post.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
