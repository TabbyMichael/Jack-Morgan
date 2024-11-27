"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserData } from '@/lib/userDb';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns';

export default function UserList() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => {
          const data = doc.data();
          // Convert Firestore Timestamps to Dates
          return {
            ...data,
            lastSignIn: data.lastSignIn?.toDate(),
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
            lastVisit: data.lastVisit?.toDate(),
          } as UserData;
        });
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-4">Loading users...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Info</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Marketing Preferences</TableHead>
            <TableHead>Analytics</TableHead>
            <TableHead>Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.uid}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{user.displayName || 'No name'}</span>
                  <span className="text-sm text-gray-500">ID: {user.uid}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{user.email || 'No email'}</span>
                  <span>{user.phoneNumber || 'No phone'}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span>Email: {user.marketingPreferences?.email ? '✓' : '✗'}</span>
                  <span>SMS: {user.marketingPreferences?.sms ? '✓' : '✗'}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-sm">
                  <span>Visits: {user.visits || 0}</span>
                  <span>Joined: {user.createdAt ? formatDistanceToNow(user.createdAt, { addSuffix: true }) : 'Unknown'}</span>
                </div>
              </TableCell>
              <TableCell>
                {user.lastVisit ? formatDistanceToNow(user.lastVisit, { addSuffix: true }) : 'Never'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
