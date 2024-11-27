import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Search, ShoppingCart, Trash2 } from "lucide-react";

export default function SavedItems() {
  const savedItems = [
    {
      id: 1,
      name: "Limited Edition Vinyl",
      price: "£79.99",
      image: "/placeholder-product.jpg",
      category: "Music",
      inStock: true,
    },
    {
      id: 2,
      name: "Tour T-Shirt 2024",
      price: "£29.99",
      image: "/placeholder-product.jpg",
      category: "Merchandise",
      inStock: true,
    },
    {
      id: 3,
      name: "Signed Poster",
      price: "£49.99",
      image: "/placeholder-product.jpg",
      category: "Merchandise",
      inStock: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search saved items..." className="pl-8" />
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="merchandise">Merchandise</SelectItem>
                <SelectItem value="tickets">Tickets</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="date-added">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-added">Date Added</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Saved Items Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {savedItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="font-bold">{item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                {!item.inStock && (
                  <p className="text-sm text-destructive">Out of Stock</p>
                )}
              </div>
              <div className="mt-4 space-x-2">
                <Button
                  className="w-full"
                  disabled={!item.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {savedItems.length === 0 && (
        <Card className="p-6 text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Saved Items</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Items you save will appear here
          </p>
          <Button className="mt-4">Browse Products</Button>
        </Card>
      )}
    </div>
  );
}
