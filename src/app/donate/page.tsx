"use client";

import { useState } from "react";
import { DollarSign, Heart, Repeat, Shield, Info, Gift, EyeOff, CreditCard, Wallet, Landmark, Banknote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { GuestDonationModal } from "@/components/GuestDonationModal";

const presetAmounts = [10, 25, 50, 100, 250, 500];
const frequencies = [
  { value: "one-time", label: "One-Time" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];
const allocations = [
  { value: "general", label: "Where Most Needed (General Fund)" },
  { value: "food", label: "Food Distribution" },
  { value: "winter", label: "Winter Relief Kits" },
  { value: "education", label: "Education Support" },
  { value: "medical", label: "Medical Aid" },
  { value: "zakat", label: "Zakat Fund" },
];

export default function Donate() {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [allocation, setAllocation] = useState("general");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const amount = customAmount ? Number(customAmount) : selectedAmount;
  const isRecurring = frequency !== "one-time";

  const proceedToCheckout = async () => {
    if (!amount || amount < 1) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!supabase) {
      toast.error("Payment service is not configured. Please contact support.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          amount,
          isMonthly: isRecurring,
          frequency,
          campaignTitle: allocations.find(a => a.value === allocation)?.label || "General Donation",
          campaignId: allocation,
          isAnonymous,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to initiate payment");
      }

      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to start checkout. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonate = () => {
    if (!user) {
      setShowGuestModal(true);
    } else {
      proceedToCheckout();
    }
  };

  return (
    <div className="space-y-8 max-w-lg mx-auto px-4">
      <div className="text-center space-y-2 pt-6">
        <h1 className="text-2xl font-bold text-foreground">Make a Donation</h1>
        <p className="text-muted-foreground">Your generosity transforms lives. Every dollar counts.</p>
          </div>

      <Card className="border-border/50">
        <CardContent className="p-6 space-y-6">
          {/* Frequency Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Giving Frequency</Label>
            <div className="grid grid-cols-3 gap-2">
              {frequencies.map((f) => (
                <Button
                  key={f.value}
                  variant={frequency === f.value ? "default" : "outline"}
                  onClick={() => setFrequency(f.value)}
                  className={`rounded-xl ${frequency === f.value ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {f.value !== "one-time" && <Repeat className="w-3 h-3 mr-1" />}
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Amount Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Select Amount</Label>
            <div className="grid grid-cols-3 gap-2">
              {presetAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant={selectedAmount === amt && !customAmount ? "default" : "outline"}
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  className={`h-12 text-lg font-semibold rounded-xl ${
                    selectedAmount === amt && !customAmount ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  ${amt}
                </Button>
              ))}
            </div>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

          {/* Allocation Dropdown */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Allocate To</Label>
            <Select value={allocation} onValueChange={setAllocation}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allocations.map((a) => (
                  <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Anonymous Toggle */}
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-secondary/50">
            <Checkbox 
              id="anonymous" 
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <div className="flex-1">
              <Label htmlFor="anonymous" className="text-foreground font-medium cursor-pointer flex items-center gap-2">
                <EyeOff className="w-4 h-4" />
                Make this donation anonymous
              </Label>
              <p className="text-xs text-muted-foreground">Your name won't appear publicly</p>
            </div>
          </div>

          {/* Donate Button */}
          <Button
            onClick={handleDonate}
            disabled={!amount || isLoading}
            className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <Heart className="w-5 h-5 mr-2" />
            {isLoading ? "Processing..." : `Donate ${amount ? `$${amount}` : ""} ${isRecurring ? frequency : ""}`}
          </Button>

          {/* Payment Methods Info */}
          <div className="p-4 rounded-xl bg-muted/30 space-y-3">
            <p className="text-sm font-medium text-foreground">Accepted Payment Methods</p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Credit Card</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Google Pay</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Apple Pay</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border">
                <Landmark className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">PayPal</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Secure payment powered by Stripe. Tax-deductible.
          </p>
        </CardContent>
      </Card>

      {/* E-Transfer Info */}
      <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Donate via E-Transfer</span>
        </div>
          <p className="text-sm text-muted-foreground">
            You can also donate directly via Interac e-Transfer:
          </p>
          <div className="p-3 rounded-lg bg-background border border-border">
            <p className="text-sm font-medium text-foreground">donate@ramadangiving.ca</p>
            <p className="text-xs text-muted-foreground mt-1">
              Please include your email in the message for a tax receipt.
            </p>
        </div>
        </CardContent>
      </Card>

      {/* Trust Info */}
      <Card className="border-border/50 border-2 border-gold/30">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gold" />
            <span className="font-medium text-foreground text-sm">How Funds Are Used</span>
      </div>
          <p className="text-xs text-muted-foreground">
            100% of Zakat goes directly to eligible recipients. General donations: 90%+ to programs, minimal overhead for essential operations.
          </p>
        </CardContent>
      </Card>

      {/* In-Kind Donations */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">In-Kind Donations</span>
        </div>
          <p className="text-sm text-muted-foreground">
            We also accept material goods: non-perishable food, warm clothing, school supplies, and hygiene items.
          </p>
          <p className="text-sm text-muted-foreground">
            Contact us at <span className="text-gold font-medium">donations@ramadangiving.org</span> to arrange drop-off or pickup.
          </p>
        </CardContent>
      </Card>

      {/* Guest Modal */}
      <GuestDonationModal
        open={showGuestModal}
        onOpenChange={setShowGuestModal}
        onContinueAsGuest={proceedToCheckout}
      />
    </div>
  );
}
