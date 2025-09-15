"use client";
import { feature } from "@/utils/constants/features";
import VideoSection from "./video-section";

const FeatureSection = () => {
  return (
    <div className="md:px-16 px-5 py-10 bg-[#f9fafb] dark:bg-muted/40">
      <h2 className="md:text-6xl text-3xl font-bold text-center mb-3">
        Why CloudInsight pro?
      </h2>
      <p className="text-center md:text-lg text-muted-foreground mb-5">
        Advanced features that go beyond AWS Cost Explorer
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          {feature.map((item, index) => (
            <div key={index} className="p-5 border-b">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <VideoSection
          videoUrl="/videos/demo.mp4"
          thumbUrl="/images/dash12.png"
        />
      </div>
    </div>
  );
};

export default FeatureSection;
