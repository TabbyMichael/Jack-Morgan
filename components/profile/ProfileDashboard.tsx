"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAuth } from "@/contexts/AuthContext";
import BasicInfo from "./sections/BasicInfo";
import AccountSettings from "./sections/AccountSettings";
import OrderHistory from "./sections/OrderHistory";
import SavedItems from "./sections/SavedItems";
import AddressBook from "./sections/AddressBook";
import PaymentMethods from "./sections/PaymentMethods";
import ContentInteraction from "./sections/ContentInteraction";
import Overview from "./sections/Overview";

export default function ProfileDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return null; // Router will redirect
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="saved">Saved Items</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>

        <TabsContent value="basic-info" className="space-y-4">
          <BasicInfo />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <SavedItems />
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <AddressBook />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <PaymentMethods />
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <ContentInteraction />
        </TabsContent>
      </Tabs>
    </div>
  );
}
