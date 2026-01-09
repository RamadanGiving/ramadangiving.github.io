import { DollarSign, Package, Shield, Users } from "lucide-react";

const stats = [
  {
    value: "$320,000+",
    label: "Raised",
    icon: DollarSign,
    size: "large",
  },
  {
    value: "5,000+",
    label: "Lunch Bags Distributed",
    icon: Package,
    size: "medium",
  },
  {
    value: "Registered",
    label: "Non-Profit Organization",
    icon: Shield,
    size: "medium",
  },
  {
    value: "100%",
    label: "Volunteer Led",
    icon: Users,
    size: "small",
  },
];

export function BentoGrid() {
  return (
    <section className="px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large Tile - $320,000+ Raised */}
          <div className="col-span-2 row-span-2 p-8 rounded-3xl bg-gradient-to-br from-primary to-primary-hover backdrop-blur-lg border border-primary/20 shadow-xl flex flex-col justify-between min-h-[280px] group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <DollarSign className="w-7 h-7 text-gold" />
            </div>
            <div>
              <p className="text-5xl md:text-6xl font-bold text-white mb-2">$320,000+</p>
              <p className="text-lg text-white/70">Raised for communities in need</p>
            </div>
          </div>

          {/* Medium Tile - Lunch Bags */}
          <div className="col-span-1 p-6 rounded-3xl bg-card/80 backdrop-blur-lg border border-border/50 shadow-lg flex flex-col justify-between min-h-[140px] group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">5,000+</p>
              <p className="text-sm text-muted-foreground">Lunch Bags</p>
            </div>
          </div>

          {/* Medium Tile - Registered NPO */}
          <div className="col-span-1 p-6 rounded-3xl bg-card/80 backdrop-blur-lg border border-border/50 shadow-lg flex flex-col justify-between min-h-[140px] group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">Registered</p>
              <p className="text-sm text-muted-foreground">Non-Profit</p>
            </div>
          </div>

          {/* Small Tile - 100% Volunteer Led */}
          <div className="col-span-2 p-6 rounded-3xl bg-gradient-to-r from-gold/20 to-gold/5 backdrop-blur-lg border border-gold/20 shadow-lg flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">100% Volunteer Led</p>
              <p className="text-sm text-muted-foreground">No paid staff, maximum impact</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
