"use client";

import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail } from 'lucide-react';
import Link from 'next/link';

// FAQ items grouped by category
const faqItems = {
  general: [
    {
      question: "What is Jack Morgan RLP all about?",
      answer: "Jack Morgan RLP is a unique blend of comedy, skateboarding, and business insights. We create content that entertains, inspires, and educates while building a community of like-minded individuals."
    },
    {
      question: "How often is new content released?",
      answer: "We release new content weekly, with premium members getting early access to exclusive videos and behind-the-scenes content."
    },
    {
      question: "Can I suggest content ideas?",
      answer: "Absolutely! We love hearing from our community. You can submit your ideas through our contact form or social media channels."
    }
  ],
  membership: [
    {
      question: "What comes with premium membership?",
      answer: "Premium membership includes exclusive content, early access to videos, behind-the-scenes footage, member-only events, and special merchandise discounts."
    },
    {
      question: "How much does premium membership cost?",
      answer: "Premium membership is available for $9.99/month or $99/year. We also occasionally offer special promotional rates."
    },
    {
      question: "Can I cancel my membership anytime?",
      answer: "Yes, you can cancel your premium membership at any time. Your benefits will continue until the end of your billing period."
    }
  ],
  content: [
    {
      question: "Where can I watch your content?",
      answer: "Our content is available on our website, YouTube channel, and Instagram. Premium content is exclusively available on our website."
    },
    {
      question: "Do you offer skateboarding lessons?",
      answer: "Yes! We offer both in-person and virtual skateboarding lessons. Check our events page for upcoming sessions."
    },
    {
      question: "Can I use your content for my own projects?",
      answer: "Our content is protected by copyright. Please contact us for licensing inquiries or collaboration opportunities."
    }
  ],
  technical: [
    {
      question: "Having trouble accessing premium content?",
      answer: "First, ensure you're logged in. If issues persist, try clearing your browser cache or contact our support team."
    },
    {
      question: "How do I update my payment information?",
      answer: "You can update your payment information in your account settings under the 'Billing' section."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and secure payment processors to protect your information."
    }
  ]
};

const FaqContent = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our content, membership, and services.
          Can&apos;t find what you&apos;re looking for? Feel free to contact us.
        </p>
      </div>

      <div className="space-y-8">
        {/* General Questions */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">General Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.general.map((item, index) => (
              <AccordionItem key={index} value={`general-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Membership */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Membership</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.membership.map((item, index) => (
              <AccordionItem key={index} value={`membership-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Content */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Content</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.content.map((item, index) => (
              <AccordionItem key={index} value={`content-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Technical Support */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Technical Support</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.technical.map((item, index) => (
              <AccordionItem key={index} value={`technical-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Still Have Questions */}
        <Card className="p-8 text-center">
          <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find the answer you&apos;re looking for? Don&apos;t hesitate to reach out to our support team.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FaqContent; 