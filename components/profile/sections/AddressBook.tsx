import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, Star, StarOff, Pencil, Trash2 } from "lucide-react";

export default function AddressBook() {
  const addresses = [
    {
      id: 1,
      name: "Home",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "London",
      state: "Greater London",
      postalCode: "SW1A 1AA",
      country: "United Kingdom",
      isDefault: true,
    },
    {
      id: 2,
      name: "Office",
      line1: "456 Business Ave",
      line2: "Floor 3",
      city: "Manchester",
      state: "Greater Manchester",
      postalCode: "M1 1AA",
      country: "United Kingdom",
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Saved Addresses</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>
                Enter the details of your new address.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Address Name</Label>
                <Input id="name" placeholder="e.g., Home, Office" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="line1">Address Line 1</Label>
                <Input id="line1" placeholder="Street address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                <Input id="line2" placeholder="Apartment, suite, etc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State/Region</Label>
                  <Input id="state" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Address</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Address Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id} className="p-6">
            <div className="space-y-4">
              {/* Address Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">{address.name}</h3>
                  {address.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {!address.isDefault && (
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-1 text-sm">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>{address.city}, {address.state}</p>
                <p>{address.postalCode}</p>
                <p>{address.country}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {addresses.length === 0 && (
        <Card className="p-6 text-center">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Saved Addresses</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your first shipping address
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </DialogTrigger>
            {/* Dialog content same as above */}
          </Dialog>
        </Card>
      )}
    </div>
  );
}
