"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CurrentEvent {
  id: string;
  title: string;
  summary: string;
  url: string;
  ctaLabel?: string;
  date?: string;
  location?: string;
  label?: string;
}

interface CurrentEventsProps {
  events: CurrentEvent[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

function EventCard({ event }: { event: CurrentEvent }) {
  return (
    <Card className="border-border/50 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/20 mx-auto max-w-lg">
      <CardContent className="p-6 flex-1 flex flex-col">
        {event.label && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            {event.label}
          </span>
        )}
        <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{event.summary}</p>
        <div className="mt-4 space-y-2">
          {event.date && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 shrink-0 text-primary" />
              <span>{event.date}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0 text-primary" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-6 pb-6">
        <Button
          asChild
          className="w-full sm:w-auto rounded-xl bg-primary hover:bg-primary-hover"
        >
          <a href={event.url} target="_blank" rel="noopener noreferrer">
            {event.ctaLabel ?? "Get tickets"}
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CurrentEvents({
  events,
  sectionTitle = "Current events",
  sectionSubtitle,
}: CurrentEventsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [events.length]);

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }
  };

  if (!events?.length) return null;

  return (
    <section className="py-10 bg-background px-4" aria-labelledby="current-events-heading">
      <div className="max-w-4xl mx-auto">
        <h2
          id="current-events-heading"
          className="text-[32px] md:text-[40px] font-bold text-foreground text-center mb-2"
        >
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="text-muted-foreground text-center mb-8">{sectionSubtitle}</p>
        )}

        <div className="relative flex items-center justify-center">
          {events.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("prev")}
                className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card border border-border/50 shadow-lg hover:bg-card w-12 h-12 md:w-10 md:h-10 flex-shrink-0"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("next")}
                className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 z-10 rounded-full bg-card border border-border/50 shadow-lg hover:bg-card w-12 h-12 md:w-10 md:h-10 flex-shrink-0"
                aria-label="Next event"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          <div
            className={cn(
              "overflow-hidden w-full transition-transform duration-500 ease-out",
              events.length > 1 ? "px-12 md:px-14" : "px-0"
            )}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {events.map((event) => (
                <div key={event.id} className="w-full flex-shrink-0 px-2">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {events.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex ? "w-8 bg-gold" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
