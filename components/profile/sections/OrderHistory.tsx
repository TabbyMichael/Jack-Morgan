import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Package, Search } from "lucide-react";

export default function OrderHistory() {
  const orders = [
    {
      id: "ORD123456",
      date: "March 15, 2024",
      status: "Delivered",
      total: "£149.99",
      items: [
        { name: "Concert T-Shirt", quantity: 2, price: "£29.99" },
        { name: "Signed Poster", quantity: 1, price: "£90.01" },
      ],
    },
    {
      id: "ORD123457",
      date: "March 10, 2024",
      status: "Processing",
      total: "£79.99",
      items: [
        { name: "Album Vinyl", quantity: 1, price: "£79.99" },
      ],
    },
    // Add more orders as needed
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-8" />
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="highest">Highest Amount</SelectItem>
                <SelectItem value="lowest">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="space-y-4">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Order {order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-4">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{item.price}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">{order.total}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
