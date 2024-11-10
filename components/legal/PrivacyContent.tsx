"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, Eye, Bell, Share2, Trash2, HelpCircle } from 'lucide-react';

const PrivacyContent = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <Card className="p-6 md:p-8 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Introduction</h2>
          </div>
          <p className="text-muted-foreground">
            Jack Morgan RLP (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information when you visit our website 
            (jackmorgan-rlp.com) and use our services.
          </p>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Information We Collect</h2>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Personal Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Name and contact information when you register</li>
              <li>Email address for newsletter subscriptions</li>
              <li>Payment information for merchandise purchases</li>
              <li>Account credentials for premium membership</li>
              <li>Profile information and preferences</li>
            </ul>

            <h3 className="text-xl font-medium mt-6">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>IP address and device information</li>
              <li>Browser type and settings</li>
              <li>Website usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
          </div>
          <ul className="space-y-4 text-muted-foreground">
            <li>• Provide and maintain our services</li>
            <li>• Process your transactions and orders</li>
            <li>• Send you marketing communications (with consent)</li>
            <li>• Improve our website and user experience</li>
            <li>• Comply with legal obligations</li>
            <li>• Detect and prevent fraud</li>
          </ul>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lock className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Data Security</h2>
          </div>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information from unauthorized access, 
            alteration, disclosure, or destruction. These measures include encryption, secure socket layer technology, 
            and regular security assessments.
          </p>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Your Rights</h2>
          </div>
          <ul className="space-y-4 text-muted-foreground">
            <li>• Access your personal data</li>
            <li>• Correct inaccurate data</li>
            <li>• Request deletion of your data</li>
            <li>• Object to data processing</li>
            <li>• Withdraw consent</li>
            <li>• Data portability</li>
          </ul>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Data Retention</h2>
          </div>
          <p className="text-muted-foreground">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
            privacy policy, unless a longer retention period is required by law.
          </p>
        </section>

        <Separator />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Contact Us</h2>
          </div>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us at:<br />
            Email: privacy@jackmorgan-rlp.com<br />
            Address: [Your Business Address]
          </p>
        </section>
      </Card>
    </div>
  );
};

export default PrivacyContent; 