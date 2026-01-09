"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: December 2024</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6 prose prose-sm max-w-none dark:prose-invert">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Ramadan Giving, you accept and agree to be bound by the terms 
              and provisions of this agreement. If you do not agree to these terms, please do not 
              use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Donations</h2>
            <p className="text-muted-foreground">
              All donations made through our platform are final and non-refundable unless otherwise 
              required by law. Tax receipts will be issued for eligible donations. We allocate funds 
              according to donor preferences when possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account credentials 
              and for all activities that occur under your account. Please notify us immediately 
              of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Ramadan Giving, a project of Bridging Borders NPO, shall not be liable for any indirect, 
              incidental, special, or consequential damages arising out of your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of our services constitutes acceptance 
              of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, contact us at legal@ramadangiving.org
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
