"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProductList from '@/components/admin/ProductList';
import UserList from '@/components/admin/UserList';
import AddProductDialog from '@/components/admin/AddProductDialog';
import { upsertUserData } from '@/lib/userDb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      if (currentUser) {
        await upsertUserData(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
        router.push('/auth');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router, setUser, user]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!user) {
    router.push('/auth');
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => auth.signOut()}
          >
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsAddProductOpen(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>
            <ProductList />
          </TabsContent>

          <TabsContent value="users">
            <UserList />
          </TabsContent>
        </Tabs>
        
        <AddProductDialog 
          open={isAddProductOpen} 
          onOpenChange={setIsAddProductOpen}
        />
      </div>
    </div>
  );
}
