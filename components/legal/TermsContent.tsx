"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ScrollText, 
  UserCheck, 
  ShieldCheck, 
  AlertCircle, 
  Scale,
  Ban,
  Copyright,
  MessageSquare
} from 'lucide-react';

const TermsContent = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Card className="p-6 md:p-8 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <ScrollText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
          </div>
          <p className="text-muted-foreground">
            By accessing or using Jack Morgan RLP&apos;s website and services, you agree to be bound by these Terms of Service. 
            If you disagree with any part of these terms, you may not access our services.
          </p>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">User Accounts</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Maintaining the security of your account</li>
              <li>All activities that occur under your account</li>
              <li>Keeping your password confidential</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Copyright className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              All content on this website, including text, graphics, logos, images, videos, and software, is the property 
              of Jack Morgan RLP and is protected by copyright and other intellectual property laws.
            </p>
            <p>You may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy our materials</li>
              <li>Use our materials for commercial purposes</li>
              <li>Redistribute our content without explicit permission</li>
              <li>Remove any copyright or other proprietary notations</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Ban className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Prohibited Activities</h2>
          </div>
          <ul className="space-y-4 text-muted-foreground">
            <li>• Violating laws or regulations</li>
            <li>• Impersonating others or providing false information</li>
            <li>• Interfering with the security of our website</li>
            <li>• Engaging in unauthorized framing or linking</li>
            <li>• Uploading malicious code or content</li>
            <li>• Harassing or threatening other users</li>
          </ul>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Premium Membership</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>Premium membership terms:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Subscription fees are billed in advance</li>
              <li>Automatic renewal unless cancelled</li>
              <li>No refunds for partial months</li>
              <li>14-day cancellation notice required</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Scale className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
          </div>
          <p className="text-muted-foreground">
            Jack Morgan RLP shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
            resulting from your use or inability to use our services.
          </p>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Changes to Terms</h2>
          </div>
          <p className="text-muted-foreground">
            We reserve the right to modify these terms at any time. We will notify users of any material changes via email 
            or website notification.
          </p>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Contact Information</h2>
          </div>
          <p className="text-muted-foreground">
            For any questions about these Terms of Service, please contact us at:<br />
            Email: legal@jackmorgan-rlp.com<br />
            Address: [Your Business Address]
          </p>
        </section>
      </Card>
    </div>
  );
};

export default TermsContent; 