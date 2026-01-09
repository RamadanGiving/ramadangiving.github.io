"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: December 2024</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6 prose prose-sm max-w-none dark:prose-invert">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly to us, including your name, email address, 
              and payment information when you make a donation. We also collect information about 
              your interactions with our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use your information to process donations, send you receipts and updates about 
              our programs, and improve our services. We never sell your personal information 
              to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your personal information. 
              Payment processing is handled securely through Stripe, and we do not store your 
              complete payment card information on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal information at any time. 
              Contact us at privacy@ramadangiving.org for any privacy-related requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at privacy@ramadangiving.org
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
