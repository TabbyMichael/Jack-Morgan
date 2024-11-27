"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate price
      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue) || priceValue < 0) {
        throw new Error('Invalid price value');
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: priceValue,
        category: formData.category.trim(),
        images: formData.images,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      console.log('Attempting to add product:', productData);
      const docRef = await addDoc(collection(db, 'products'), productData);
      console.log('Product added successfully with ID:', docRef.id);
      
      toast.success('Product added successfully');
      onOpenChange(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        images: []
      });
    } catch (error) {
      console.error('Detailed error adding product:', error);
      if (error instanceof Error) {
        toast.error(`Failed to add product: ${error.message}`);
      } else {
        toast.error('Failed to add product');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Images</Label>
            <ImageUpload
              images={formData.images}
              onChange={(images) => setFormData({ ...formData, images })}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Product'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
