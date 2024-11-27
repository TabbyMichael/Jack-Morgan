import { Metadata } from 'next';
import ProfileDashboard from '@/components/profile/ProfileDashboard';

export const metadata: Metadata = {
  title: 'Profile | Jack Morgan',
  description: 'Manage your Jack Morgan profile, orders, and preferences',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ProfileDashboard />
    </div>
  );
}
