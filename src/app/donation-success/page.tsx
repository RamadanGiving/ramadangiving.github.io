"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Home, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { SmartDonationModal } from "@/components/home/SmartDonationModal";

export default function DonationSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(true);
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const sessionId = searchParams.get("session_id");
  const campaignId = searchParams.get("campaign_id");
  const amount = searchParams.get("amount");

  useEffect(() => {
    const updateCampaign = async () => {
      if (campaignId && amount) {
        try {
          // Fetch current raised amount
          const { data: campaign, error: fetchError } = await supabase
            .from("campaigns")
            .select("raised_amount")
            .eq("id", campaignId)
            .maybeSingle();

          if (fetchError) throw fetchError;

          if (campaign) {
            // Update raised amount
            const newAmount = Number(campaign.raised_amount) + Number(amount);
            const { error: updateError } = await supabase
              .from("campaigns")
              .update({ raised_amount: newAmount })
              .eq("id", campaignId);

            if (updateError) throw updateError;
          }
        } catch (error) {
          console.error("Error updating campaign:", error);
        }
      }
      setIsUpdating(false);
    };

    updateCampaign();
  }, [campaignId, amount]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-border/50">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              Jazakallah Khair!
            </h1>
            <p className="text-muted-foreground">
              Your generous donation of{" "}
              <span className="font-semibold text-accent">${amount || "0"}</span>{" "}
              has been received.
            </p>
          </div>

          {/* Quote */}
          <blockquote className="text-sm italic text-muted-foreground border-l-2 border-accent pl-4 text-left">
            "Whoever relieves a believer's distress, Allah will relieve his distress on the Day of Resurrection."
            <cite className="block mt-1 text-xs font-medium text-accent not-italic">
              — Prophet Muhammad (ﷺ)
            </cite>
          </blockquote>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={() => setDonationModalOpen(true)}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
            >
              <Heart className="w-4 h-4 mr-2" />
              Donate Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full h-12 rounded-xl border-border hover:bg-secondary"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>

      <SmartDonationModal open={donationModalOpen} onOpenChange={setDonationModalOpen} />
    </div>
  );
}
