"use client";

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  doc,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, UserPlus } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  status: string;
  createdAt: Date;
  lastLogin?: Date;
}

interface ActivityLog {
  action: string;
  timestamp: Date;
  details: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const usersQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(usersQuery);
      const usersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        role: doc.data().role || 'user',
        status: doc.data().status || 'active',
        createdAt: doc.data().createdAt?.toDate(),
        lastLogin: doc.data().lastLogin?.toDate(),
      })) as User[];
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        role: newRole,
        updatedAt: new Date(),
      });
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        status: newStatus,
        updatedAt: new Date(),
      });
      await fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getRoleBadgeColor = (role?: string) => {
    if (!role) return 'bg-gray-100 text-gray-800';
    
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'moderator':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sign In</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name || user.email}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.lastLogin
                        ? formatDistanceToNow(user.lastLogin, { addSuffix: true })
                        : 'Never'}
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(user.createdAt, { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setIsUserDetailsOpen(true);
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user.id, 'admin')}
                          >
                            Make Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user.id, 'moderator')}
                          >
                            Make Moderator
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateUserRole(user.id, 'user')}
                          >
                            Make User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => updateUserStatus(user.id, 'active')}
                          >
                            Activate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateUserStatus(user.id, 'suspended')}
                            className="text-red-600"
                          >
                            Suspend
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Basic Information</h3>
                  <div className="mt-2 space-y-2">
                    <p><span className="text-gray-500">Name:</span> {selectedUser.name}</p>
                    <p><span className="text-gray-500">Email:</span> {selectedUser.email}</p>
                    <p><span className="text-gray-500">Role:</span> {selectedUser.role}</p>
                    <p><span className="text-gray-500">Status:</span> {selectedUser.status}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">Activity Information</h3>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="text-gray-500">Last Sign In:</span>{' '}
                      {selectedUser.lastLogin
                        ? formatDistanceToNow(selectedUser.lastLogin, { addSuffix: true })
                        : 'Never'}
                    </p>
                    <p>
                      <span className="text-gray-500">Account Created:</span>{' '}
                      {formatDistanceToNow(selectedUser.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Recent Activity</h3>
                <div className="space-y-2">
                  {/* No activity log available */}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with specified role and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="user@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <Input placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Create User</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
