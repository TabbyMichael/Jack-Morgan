export interface SocialLinks {
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
}

export interface Address {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
}

export interface SavedItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  addedAt: string;
}

export interface UserPreferences {
  newsletter: boolean;
  emailNotifications: {
    orders: boolean;
    promotions: boolean;
    events: boolean;
    comments: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showLocation: boolean;
    showSocial: boolean;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  location?: string;
  socialLinks?: Partial<SocialLinks>;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
  orders?: Order[];
  events?: Event[];
  savedItems?: SavedItem[];
  createdAt: string;
  updatedAt: string;
}
