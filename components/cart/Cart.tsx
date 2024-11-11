"use client";

import { useCart } from "@/contexts/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate total cost
  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-black text-white p-4 rounded-lg">
            <span className="text-xl font-semibold">Subtotal ({cart.length} items):</span>
            <span className="text-xl font-bold">${totalCost.toFixed(2)}</span>
          </div>
          {cart.map((item) => (
            <Card key={item.id} className="flex p-4 items-center space-x-4">
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="px-2 py-1"
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1">+</Button>
                <Button onClick={() => removeFromCart(item.id)} className="px-2 py-1">Remove</Button>
              </div>
            </Card>
          ))}
          <Button onClick={clearCart} className="mt-4 bg-red-500 text-white">Clear Cart</Button>
        </div>
      )}
    </div>
  );
};

export default Cart; 