"use client";

import { Users, Briefcase, Mail, Heart, Building2, HandHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const involvementCards = [
  {
    title: "Volunteer",
    description: "Join our hands-on team. Help with events, food packing, distribution, and outreach.",
    icon: HandHeart,
    action: "Apply to Volunteer",
    link: "mailto:volunteer@ramadangiving.org?subject=Volunteer Application",
    color: "primary",
  },
  {
    title: "Partner with Us",
    description: "Organizations and institutions looking to collaborate on community initiatives.",
    icon: Building2,
    action: "Become a Partner",
    link: "mailto:partnerships@ramadangiving.org?subject=Partnership Inquiry",
    color: "gold",
  },
  {
    title: "Sponsor Programs",
    description: "Corporate sponsors can support specific programs, events, or ongoing initiatives.",
    icon: Briefcase,
    action: "Sponsor a Program",
    link: "mailto:sponsors@ramadangiving.org?subject=Sponsorship Inquiry",
    color: "accent",
  },
];

export default function GetInvolved() {
  const router = useRouter();

  return (
    <div className="space-y-10 max-w-4xl mx-auto px-4">
      {/* Header */}
      <section className="text-center space-y-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Get Involved</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our movement. Whether you volunteer, partner, or sponsor—every contribution creates impact.
        </p>
      </section>

      {/* Three Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        {involvementCards.map((card) => (
          <Card key={card.title} className="border-border/50 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardContent className="p-6 flex flex-col flex-1 space-y-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                card.color === "primary" ? "bg-primary/10" : 
                card.color === "gold" ? "bg-gold/10" : "bg-accent/10"
              }`}>
                <card.icon className={`w-7 h-7 ${
                  card.color === "primary" ? "text-primary" : 
                  card.color === "gold" ? "text-gold" : "text-accent"
                }`} />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </div>
              <Button 
                onClick={() => window.location.href = card.link}
                className={`w-full rounded-xl ${
                  card.color === "primary" ? "bg-primary hover:bg-primary-hover text-primary-foreground" : 
                  card.color === "gold" ? "bg-gold hover:bg-gold/90 text-gold-foreground" : 
                  "bg-accent hover:bg-accent/90 text-accent-foreground"
                }`}
              >
                {card.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Contact CTA */}
      <section className="space-y-4">
        <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Questions?</h3>
              <p className="text-muted-foreground mt-2">
                Reach out to us to discuss opportunities or any questions you may have.
              </p>
            </div>
            <div className="pt-2">
              <p className="text-lg font-semibold text-gold">info@ramadangiving.org</p>
              <p className="text-sm text-muted-foreground mt-1">We typically respond within 48 hours</p>
            </div>
            <Button 
              variant="outline" 
              className="rounded-xl" 
              onClick={() => router.push("/contact")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
