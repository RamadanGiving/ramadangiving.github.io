import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Globe, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    year: "2021",
    title: "The Beginning",
    description: "Providing meals to the unhoused in Toronto. Started with a small group of volunteers during Ramadan.",
    icon: Sparkles,
    color: "bg-primary",
  },
  {
    year: "2022-23",
    title: "Scaling Up",
    description: "Expanded to winter kits, youth programs, and educational support. Reached over 2,000 families.",
    icon: TrendingUp,
    color: "bg-gold",
  },
  {
    year: "2024",
    title: "Global Reach",
    description: "Palestine Emergency Relief campaign launched. Extended aid internationally while growing local impact.",
    icon: Globe,
    color: "bg-accent",
  },
  {
    year: "2025",
    title: "Future Vision",
    description: "Bridging Borders becomes a registered NPO. Expanding programs and building sustainable community partnerships.",
    icon: Building2,
    color: "bg-primary",
  },
];

export function ImpactTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (direction: "left" | "right") => {
    if (direction === "left" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === "right" && activeIndex < timelineData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <section id="impact-section" className="py-16 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From a small Ramadan initiative to a registered nonprofit—see how we've grown together.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="relative mb-8">
          {/* Navigation Arrows */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollTo("left")}
              disabled={activeIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {activeIndex + 1} of {timelineData.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollTo("right")}
              disabled={activeIndex === timelineData.length - 1}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Timeline Line */}
          <div className="hidden md:block relative h-1 bg-border rounded-full mb-8">
            <div 
              className="absolute h-full bg-gradient-to-r from-primary to-gold rounded-full transition-all duration-500"
              style={{ width: `${((activeIndex + 1) / timelineData.length) * 100}%` }}
            />
          </div>

          {/* Year Markers - Desktop */}
          <div className="hidden md:flex justify-between mb-8" ref={scrollRef}>
            {timelineData.map((item, index) => (
              <button
                key={item.year}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "flex flex-col items-center gap-2 transition-all duration-300",
                  index === activeIndex ? "opacity-100" : "opacity-50 hover:opacity-75"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                  index === activeIndex ? item.color : "bg-muted",
                  index === activeIndex && "scale-110 shadow-lg"
                )}>
                  <item.icon className={cn(
                    "w-5 h-5",
                    index === activeIndex ? "text-white" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-sm font-semibold transition-colors duration-300",
                  index === activeIndex ? "text-foreground" : "text-muted-foreground"
                )}>
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Content Card */}
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-lg transition-all duration-500">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0",
              timelineData[activeIndex].color
            )}>
              {(() => {
                const Icon = timelineData[activeIndex].icon;
                return <Icon className="w-8 h-8 text-white" />;
              })()}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-gold font-bold text-lg">{timelineData[activeIndex].year}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {timelineData[activeIndex].title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {timelineData[activeIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {timelineData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "w-6 bg-gold" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
