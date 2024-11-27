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
import { CreditCard, Plus, Star, Trash2 } from "lucide-react";

export default function PaymentMethods() {
  const paymentMethods = [
    {
      id: 1,
      type: "card",
      cardType: "Visa",
      last4: "4242",
      expiryDate: "12/24",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      cardType: "Mastercard",
      last4: "8888",
      expiryDate: "06/25",
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Payment Methods</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Enter your card details to add a new payment method.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input id="cardholderName" placeholder="Name on card" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Card</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Method Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="p-6">
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">{method.cardType} •••• {method.last4}</h3>
                  {method.isDefault && (
                    <Badge variant="secondary">Default</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {!method.isDefault && (
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">Expires {method.expiryDate}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {paymentMethods.length === 0 && (
        <Card className="p-6 text-center">
          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Payment Methods</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your first payment method
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            {/* Dialog content same as above */}
          </Dialog>
        </Card>
      )}
    </div>
  );
}
