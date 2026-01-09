import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const communityGroups = [
  {
    title: "Community Leaders",
    description: "Experienced organizers who guide our programs and ensure we meet community needs.",
    icon: Users,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2032&auto=format&fit=crop",
    count: "15+",
  },
  {
    title: "Youth Ambassadors",
    description: "Young changemakers leading outreach, social media, and engaging the next generation.",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    count: "30+",
  },
  {
    title: "Volunteers",
    description: "The heart of our organization. Dedicated individuals who make every program possible.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop",
    count: "200+",
  },
];

export function CommunityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % communityGroups.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev - 1 + communityGroups.length) % communityGroups.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % communityGroups.length);
    }
  };

  return (
    <section className="px-4">
      <div className="max-w-6xl mx-auto">
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Fixed size on mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("prev")}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-card w-[56px] h-[56px] md:w-10 md:h-10 flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("next")}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-card w-[56px] h-[56px] md:w-10 md:h-10 flex-shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Cards */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {communityGroups.map((group, index) => (
                <div 
                  key={group.title}
                  className="w-full flex-shrink-0 relative"
                >
                  {/* Background Image */}
                  <div 
                    className="h-[400px] md:h-[500px] bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${group.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                            <group.icon className="w-7 h-7 text-gold" />
                          </div>
                          <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                            <span className="text-white font-semibold">{group.count} Members</span>
                          </div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                          {group.title}
                        </h3>
                        <p className="text-lg text-white/80 leading-relaxed">
                          {group.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {communityGroups.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex ? "w-8 bg-gold" : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
