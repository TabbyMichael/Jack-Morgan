// Mock merchandise data
export const merchItems = [
  {
    id: 1,
    name: "Classic Logo Tee",
    price: 29.99,
    originalPrice: 39.99,
    image: "/assets/images/merch/logo-tee.jpg",
    images: [
      "/assets/images/merch/logo-tee.jpg",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80"
    ],
    badge: "Best Seller",
    description: "Premium quality cotton t-shirt with embroidered logo. Made from 100% organic cotton for maximum comfort and durability. Features our iconic logo design.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "T-Shirts",
    rating: 4.8,
    reviews: 128,
    inStock: true
  },
  {
    id: 2,
    name: "Skater Hoodie",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80"
    ],
    badge: "New Arrival",
    description: "Comfortable hoodie perfect for skating sessions. Features a kangaroo pocket and adjustable drawstring hood. Made from premium fleece material.",
    sizes: ["S", "M", "L", "XL"],
    category: "Hoodies",
    rating: 4.9,
    reviews: 89,
    inStock: true
  },
  {
    id: 3,
    name: "Business Cap",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80"
    ],
    badge: "Limited Edition",
    description: "Stylish cap for the business-minded rebel. Adjustable strap for perfect fit. Embroidered logo on front.",
    sizes: ["One Size"],
    category: "Accessories",
    rating: 4.7,
    reviews: 56,
    inStock: true
  },
  {
    id: 4,
    name: "Urban Street Tee",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80"
    ],
    description: "Street-style inspired graphic t-shirt. Features unique urban artwork. Made from soft cotton blend.",
    sizes: ["S", "M", "L", "XL"],
    category: "T-Shirts",
    rating: 4.6,
    reviews: 42,
    inStock: true
  },
  {
    id: 5,
    name: "Tech Backpack",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80"
    ],
    badge: "New",
    description: "Modern backpack with laptop compartment. Water-resistant material. Multiple compartments for organization.",
    category: "Accessories",
    rating: 4.9,
    reviews: 73,
    inStock: true
  },
  {
    id: 6,
    name: "Winter Zip Hoodie",
    price: 69.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?auto=format&fit=crop&q=80"
    ],
    description: "Warm zip-up hoodie for winter days. Fleece-lined for extra warmth. Features front zip pockets.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Hoodies",
    rating: 4.8,
    reviews: 94,
    inStock: true
  }
];

export const getProductById = (id: number) => {
  return merchItems.find(item => item.id === id);
};
