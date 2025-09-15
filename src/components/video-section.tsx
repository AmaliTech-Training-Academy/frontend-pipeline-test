import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Pause, Play } from "lucide-react";

const VideoSection = ({
  videoUrl,
  thumbUrl,
}: {
  videoUrl: string;
  thumbUrl: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const togglePlay = async () => {
    if (videoRef.current && !isLoading && videoRef.current.isConnected) {
      setIsLoading(true);
      if (videoRef.current.paused) {
        await videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsLoading(false);
    }
  };
  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-2xl border group cursor-pointer"
      onClick={togglePlay}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        preload="metadata"
        poster={thumbUrl}
        onError={() => {
          setIsLoading(false);
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          size="lg"
          disabled={isLoading}
          className="bg-black/50 w-14 h-14 hover:bg-black/70 text-white rounded-full p-4 transition-all duration-200 group-hover:scale-110 disabled:opacity-50"
          onClick={e => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          {videoRef.current && !videoRef.current.paused ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoSection;
