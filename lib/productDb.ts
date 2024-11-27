import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  DocumentReference,
} from 'firebase/firestore';

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color?: string;
  stockLevel: number;
  sku: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  createdAt: Timestamp;
  helpful: number;
}

// Collection References
const productsCol = collection(db, 'products');
const getVariantsCol = (productId: string) => 
  collection(db, 'products', productId, 'variants');
const getReviewsCol = (productId: string) => 
  collection(db, 'products', productId, 'reviews');

// Product Operations
export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = doc(productsCol);
  const timestamp = Timestamp.now();
  
  const product: Product = {
    id: docRef.id,
    ...productData,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  await setDoc(docRef, product);
  return product;
};

export const getProduct = async (productId: string) => {
  const docRef = doc(productsCol, productId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    throw new Error('Product not found');
  }
  
  return docSnap.data() as Product;
};

export const updateProduct = async (productId: string, updates: Partial<Product>) => {
  const docRef = doc(productsCol, productId);
  const timestamp = Timestamp.now();
  
  await updateDoc(docRef, {
    ...updates,
    updatedAt: timestamp,
  });
};

// Variant Operations
export const addVariant = async (productId: string, variantData: Omit<ProductVariant, 'id' | 'productId'>) => {
  const variantsCol = getVariantsCol(productId);
  const docRef = doc(variantsCol);
  
  const variant: ProductVariant = {
    id: docRef.id,
    productId,
    ...variantData,
  };

  await setDoc(docRef, variant);
  return variant;
};

export const getVariants = async (productId: string) => {
  const variantsCol = getVariantsCol(productId);
  const querySnapshot = await getDocs(variantsCol);
  
  return querySnapshot.docs.map(doc => doc.data() as ProductVariant);
};

// Review Operations
export const addReview = async (productId: string, reviewData: Omit<Review, 'id' | 'productId' | 'createdAt' | 'helpful'>) => {
  const reviewsCol = getReviewsCol(productId);
  const docRef = doc(reviewsCol);
  
  const review: Review = {
    id: docRef.id,
    productId,
    ...reviewData,
    createdAt: Timestamp.now(),
    helpful: 0,
  };

  await setDoc(docRef, review);
  return review;
};

export const getProductReviews = async (productId: string) => {
  const reviewsCol = getReviewsCol(productId);
  const querySnapshot = await getDocs(reviewsCol);
  
  return querySnapshot.docs.map(doc => doc.data() as Review);
};

// Query Operations
export const getProductsByCategory = async (category: string, limit: number = 10) => {
  const q = query(
    productsCol,
    where('category', '==', category),
    orderBy('createdAt', 'desc'),
    firestoreLimit(limit)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Product);
};

export const getLowStockProducts = async (threshold: number = 5) => {
  // This is a simplified version. In reality, you might want to check variants
  const q = query(
    productsCol,
    where('stockLevel', '<=', threshold)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as Product);
};
