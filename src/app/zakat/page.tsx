"use client";

import { Calculator, Info, Coins, Gem, Briefcase, Building2, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Zakat() {
  const router = useRouter();
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [investments, setInvestments] = useState("");
  const [businessAssets, setBusinessAssets] = useState("");
  const [debts, setDebts] = useState("");

  // Gold price per gram (approximate)
  const goldPricePerGram = 75;

  const goldValue = (Number(gold) || 0) * goldPricePerGram;
  const totalAssets =
    (Number(cash) || 0) +
    goldValue +
    (Number(investments) || 0) +
    (Number(businessAssets) || 0);
  const totalDebts = Number(debts) || 0;
  const netAssets = totalAssets - totalDebts;
  const zakatDue = Math.max(netAssets * 0.025, 0);
  const nisab = 5500; // Approximate nisab threshold

  const inputFields = [
    {
      label: "Cash & Bank Savings",
      value: cash,
      onChange: setCash,
      icon: Coins,
      placeholder: "$0",
    },
    {
      label: "Gold (in grams)",
      value: gold,
      onChange: setGold,
      icon: Gem,
      placeholder: "0g",
      suffix: `≈ $${goldValue.toLocaleString()}`,
    },
    {
      label: "Investments & Stocks",
      value: investments,
      onChange: setInvestments,
      icon: Briefcase,
      placeholder: "$0",
    },
    {
      label: "Business Assets",
      value: businessAssets,
      onChange: setBusinessAssets,
      icon: Building2,
      placeholder: "$0",
    },
  ];

  return (
    <div className="space-y-6 max-w-lg mx-auto px-4">
      <div className="text-center pt-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Zakat Calculator</h1>
        <p className="text-muted-foreground">Calculate your obligatory charity</p>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4" />
            <span>Nisab threshold: ${nisab.toLocaleString()}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Asset Input Fields */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Your Assets</p>
            {inputFields.map((field) => (
              <div key={field.label}>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                  <field.icon className="w-4 h-4" />
                  {field.label}
                </label>
                <input
                  type="number"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
                {field.suffix && field.value && (
                  <p className="text-xs text-muted-foreground mt-1">{field.suffix}</p>
                )}
              </div>
            ))}
          </div>

          {/* Deductions */}
          <div className="space-y-3 pt-2 border-t border-border">
            <p className="text-sm font-semibold text-foreground">Deductions</p>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Outstanding Debts
              </label>
              <input
                type="number"
                placeholder="$0"
                value={debts}
                onChange={(e) => setDebts(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>
          </div>

          {/* Results */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Assets</span>
              <span className="font-semibold text-foreground">
                ${totalAssets.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Less Debts</span>
              <span className="font-medium text-destructive">
                -${totalDebts.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Net Zakatable Assets</span>
              <span className="font-semibold text-foreground">
                ${Math.max(netAssets, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Zakat Rate</span>
              <span className="font-medium text-foreground">2.5%</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border">
              <span className="font-semibold text-foreground text-lg">Zakat Due</span>
              <span className="text-3xl font-bold text-accent">
                ${zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Pay Button */}
          <Button
            onClick={() => router.push("/donate")}
            className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground transition-all duration-200"
            disabled={netAssets < nisab}
          >
            <Calculator className="w-5 h-5 mr-2" />
            {netAssets >= nisab ? "Pay Zakat Now" : "Below Nisab Threshold"}
          </Button>

          {netAssets < nisab && totalAssets > 0 && (
            <p className="text-xs text-center text-muted-foreground">
              Your net assets (${netAssets.toLocaleString()}) are below the nisab threshold (${nisab.toLocaleString()}).
              Zakat is not obligatory, but voluntary charity is always rewarded.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
