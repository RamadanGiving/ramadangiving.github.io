"use client";

import { Calendar, Tag, ArrowRight, Sparkles, AlertTriangle, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NewsType = "recap" | "announcement" | "emergency";

interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  type: NewsType;
  featured?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    date: "December 15, 2024",
    title: "Winter Relief Program Launches",
    excerpt: "We're excited to announce the start of our annual Winter Relief Program, providing warm clothing and heating assistance to families in need across the city.",
    type: "announcement",
    featured: true
  },
  {
    id: "2",
    date: "December 10, 2024",
    title: "Ramadan 2024 Recap: 5,000 Meals Distributed",
    excerpt: "Thanks to your generous support, we successfully distributed over 5,000 meals during the blessed month. Here's a look back at the impact we made together.",
    type: "recap"
  },
  {
    id: "3",
    date: "December 1, 2024",
    title: "Emergency: Gaza Relief Fund",
    excerpt: "In response to the ongoing humanitarian crisis, we've established an emergency relief fund. 100% of donations go directly to on-the-ground partners.",
    type: "emergency"
  },
  {
    id: "4",
    date: "November 20, 2024",
    title: "Thanksgiving Community Dinner Success",
    excerpt: "Our annual Thanksgiving dinner served 300+ community members. Thank you to all volunteers who made this possible!",
    type: "recap"
  },
  {
    id: "5",
    date: "November 10, 2024",
    title: "New Partnership with Local Food Bank",
    excerpt: "We're thrilled to announce a new partnership that will help us expand our food distribution capacity by 40%.",
    type: "announcement"
  },
  {
    id: "6",
    date: "October 28, 2024",
    title: "Back to School Program Wrap-Up",
    excerpt: "500 students received school supplies and backpacks through our annual back-to-school initiative. See the smiles!",
    type: "recap"
  },
];

const getTypeIcon = (type: NewsType) => {
  switch (type) {
    case "recap":
      return Sparkles;
    case "announcement":
      return Megaphone;
    case "emergency":
      return AlertTriangle;
  }
};

const getTypeBadge = (type: NewsType) => {
  switch (type) {
    case "recap":
      return { label: "Program Recap", className: "bg-primary/10 text-primary" };
    case "announcement":
      return { label: "Announcement", className: "bg-gold/10 text-gold" };
    case "emergency":
      return { label: "Emergency Update", className: "bg-destructive/10 text-destructive" };
  }
};

export default function News() {
  const featuredNews = newsItems.find(n => n.featured);
  const regularNews = newsItems.filter(n => !n.featured);

  return (
    <div className="space-y-10 max-w-4xl mx-auto px-4">
      {/* Header */}
      <section className="text-center space-y-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">News & Updates</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay informed about our programs, events, and the impact we're making together.
        </p>
      </section>

      {/* Featured Article */}
      {featuredNews && (
        <section>
          <Card className="border-border/50 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              <Megaphone className="w-16 h-16 text-primary/40" />
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Badge className={getTypeBadge(featuredNews.type).className}>
                  {getTypeBadge(featuredNews.type).label}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {featuredNews.date}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{featuredNews.title}</h2>
              <p className="text-muted-foreground">{featuredNews.excerpt}</p>
              <Button className="rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground">
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </section>
      )}

      {/* News Feed */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Recent Updates</h2>
        <div className="space-y-4">
          {regularNews.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            const badge = getTypeBadge(item.type);
            return (
              <Card key={item.id} className="border-border/50 card-hover">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className="hidden sm:flex w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 items-center justify-center flex-shrink-0">
                      <TypeIcon className="w-8 h-8 text-primary/60" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={badge.className}>{badge.label}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section>
        <Card className="border-border/50 bg-gradient-to-br from-gold/5 to-primary/5">
          <CardContent className="p-6 text-center space-y-4">
            <Tag className="w-10 h-10 text-gold mx-auto" />
            <h3 className="text-lg font-bold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest news, event announcements, and impact stories.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="rounded-xl bg-gold hover:bg-gold/90 text-gold-foreground">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
