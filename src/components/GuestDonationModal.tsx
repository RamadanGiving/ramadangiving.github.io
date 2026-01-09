"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, UserPlus, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface GuestDonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueAsGuest: () => void;
  onSignIn?: () => void;
  returnPath?: string;
}

export function GuestDonationModal({ 
  open, 
  onOpenChange, 
  onContinueAsGuest,
  onSignIn,
  returnPath = "/donate"
}: GuestDonationModalProps) {
  const router = useRouter();

  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
    } else {
      onOpenChange(false);
      router.push(`/login?from=${encodeURIComponent(returnPath)}`);
    }
  };

  const handleSignUp = () => {
    onOpenChange(false);
    router.push(`/signup?from=${encodeURIComponent(returnPath)}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl font-bold text-foreground">
            Save your tax receipt?
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Sign in to track your donations and receive tax receipts automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <Button
            onClick={handleSignIn}
            className="w-full h-14 rounded-xl text-base font-semibold bg-primary hover:bg-primary-hover"
          >
            <User className="w-5 h-5 mr-2" />
            Sign In
          </Button>

          <Button
            variant="outline"
            onClick={handleSignUp}
            className="w-full h-14 rounded-xl text-base font-semibold"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Account
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => {
              onOpenChange(false);
              onContinueAsGuest();
            }}
            className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground"
          >
            Continue as Guest
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Guest donations are still secure and tax-deductible.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
