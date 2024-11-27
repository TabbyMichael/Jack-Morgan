"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Types
interface DashboardMetric {
  title: string;
  value: string | number;
  description: string;
  trend: number;
  icon: any;
}

interface RecentOrder {
  id: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: Date;
}

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  threshold: number;
}

interface Product {
  name: string;
  stock: number;
  threshold: number;
  [key: string]: any;
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch metrics
      const metricsData: DashboardMetric[] = [
        {
          title: 'Total Users',
          value: await fetchTotalUsers(),
          description: 'Total registered users',
          trend: 12.5,
          icon: Users,
        },
        {
          title: 'Total Orders',
          value: await fetchTotalOrders(),
          description: 'Orders this month',
          trend: 8.2,
          icon: ShoppingBag,
        },
        {
          title: 'Revenue',
          value: formatCurrency(await fetchTotalRevenue()),
          description: 'Revenue this month',
          trend: 15.3,
          icon: DollarSign,
        },
        {
          title: 'Inventory',
          value: await fetchTotalProducts(),
          description: 'Products in stock',
          trend: -2.4,
          icon: Package,
        },
      ];
      setMetrics(metricsData);

      // Fetch recent orders
      const ordersQuery = query(
        collection(db, 'orders'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersData = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as RecentOrder[];
      setRecentOrders(ordersData);

      // Fetch low stock items
      const productsQuery = query(collection(db, 'products'));
      const productsSnapshot = await getDocs(productsQuery);
      const lowStock = productsSnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...(doc.data() as Product),
        }))
        .filter(product => product.stock < product.threshold)
        .slice(0, 5) as InventoryItem[];
      setLowStockItems(lowStock);

      // Generate sample sales data (replace with real data)
      const sampleData = generateSampleSalesData();
      setSalesData(sampleData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
              <div className={`flex items-center text-xs ${
                metric.trend > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.trend > 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(metric.trend)}% from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(order.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Alert</CardTitle>
          <CardDescription>Products that need restocking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Current stock: {item.stock}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-red-500">
                    Below threshold: {item.threshold}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper functions
async function fetchTotalUsers() {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.size;
}

async function fetchTotalOrders() {
  const snapshot = await getDocs(collection(db, 'orders'));
  return snapshot.size;
}

async function fetchTotalRevenue() {
  const snapshot = await getDocs(collection(db, 'orders'));
  return snapshot.docs.reduce((total, doc) => total + (doc.data().total || 0), 0);
}

async function fetchTotalProducts() {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.size;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function generateSampleSalesData() {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months.map(month => ({
    name: month,
    revenue: Math.floor(Math.random() * 50000) + 10000,
  }));
}
