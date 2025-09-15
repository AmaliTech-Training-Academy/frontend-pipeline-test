"use client";
import { Button } from "./ui/button";
import VideoSection from "./video-section";

const HeroSection = () => {
  return (
    <div className="md:px-16 px-5 bg-[#f0f7ff] dark:bg-background">
      <div className="text-center py-5 space-y-3">
        <h1 className="md:text-6xl text-4xl font-bold leading-tight">
          <span className="text-primary">Master Your</span>
          <br />
          <span className="">AWS Cloud Costs</span>
        </h1>
        <p className="text-lg md:max-w-3xl md:mx-auto w-full text-muted-foreground ">
          The most advanced AWS cost management platform. Get AI-powered
          insights, real-time monitoring, and actionable recommendations to
          optimize your cloud spending
        </p>
        <Button className="bg-primary hover:bg-primary/80 text-white rounded-sm">
          Start free trial
        </Button>
      </div>

      <div className="pb-10">
        <VideoSection
          videoUrl="/videos/demo.mp4"
          thumbUrl="/images/dash12.png"
        />
      </div>
    </div>
  );
};

export default HeroSection;
