"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/utils/constants/testimonials";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev =>
      prev + itemsPerView >= testimonials.length ? 0 : prev + 1
    );
  }, [itemsPerView]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [itemsPerView, nextSlide]);

  return (
    <section
      id="testimonials"
      className="py-16 bg-[#f0f7ff] dark:bg-background"
    >
      <div className="">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold  mb-4 text-balance">
            Trusted by Industry Leaders
          </h2>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-40" />
            </div>
            <span className="text-muted-foreground ml-2">
              4.9/5 from 500+ reviews
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              }}
            >
              {testimonials.map(testimonial => (
                <div
                  key={testimonial.id}
                  className="px-3 flex-shrink-0"
                  style={{
                    width: `${100 / itemsPerView}%`,
                  }}
                >
                  <Card className=" border-0 shadow-sm h-full">
                    <CardContent className="p-6">
                      {/* Profile */}
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                          />
                          <AvatarFallback className=" text-sm">
                            {testimonial.name
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold  text-sm">
                            {testimonial.name}
                          </h3>
                          <p className="text-muted-foreground text-xs">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <blockquote className="text-muted-foreground text-sm leading-relaxed">
                        &quot;{testimonial.content}&quot;
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
