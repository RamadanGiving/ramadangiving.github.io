"use client";

import { useEffect } from "react";
import { User, Heart, History, Settings, LogOut, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const menuItems = [
  { label: "My Donations", icon: Heart },
  { label: "Transaction History", icon: History },
  { label: "Settings", icon: Settings },
];

export default function Profile() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?from=${encodeURIComponent("/profile")}`);
    }
  }, [user, loading, router]);

  // Fetch donation history - this would need a donations table
  const { data: donations, isLoading: donationsLoading } = useQuery({
    queryKey: ["userDonations", user?.id],
    queryFn: async () => {
      // This is a placeholder - would need a donations table
      return [];
    },
    enabled: !!user,
  });

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-lg mx-auto px-4">
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalDonated = 0; // Would calculate from donations
  const donationCount = donations?.length || 0;

  return (
    <div className="space-y-6 max-w-lg mx-auto px-4">
      {/* Profile Header */}
      <Card className="border-border/50 overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-primary/30 to-accent/30" />
        <CardContent className="pt-0 pb-6">
          <div className="flex flex-col items-center -mt-12">
            <Avatar className="w-24 h-24 border-4 border-card">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
                {user.email?.charAt(0).toUpperCase() || <User className="w-12 h-12" />}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              {user.email?.split("@")[0] || "User"}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gold" />
            </div>
            <p className="text-2xl font-bold text-foreground">${totalDonated}</p>
            <p className="text-xs text-muted-foreground">Total Given</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{donationCount}</p>
            <p className="text-xs text-muted-foreground">Donations</p>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="p-4 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <History className="w-5 h-5 text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground">Causes</p>
          </CardContent>
        </Card>
      </div>

      {/* Donation History */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Donation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {donationsLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ) : donations && donations.length > 0 ? (
            <div className="space-y-3">
              {/* Would map over donations here */}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No donations yet</p>
              <Button
                variant="outline"
                className="mt-4 rounded-xl"
                onClick={() => router.push("/donate")}
              >
                Make Your First Donation
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Menu */}
      <Card className="border-border/50">
        <CardContent className="p-2">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center justify-between p-4 rounded-xl hover:bg-secondary transition-colors duration-200 ${
                index < menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button
        variant="outline"
        onClick={handleSignOut}
        className="w-full h-12 rounded-xl border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-200"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
