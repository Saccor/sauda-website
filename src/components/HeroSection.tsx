import Header from "./Header";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React, { forwardRef } from "react";

interface HeroSectionProps {
  // Accept the ref and pass it to Header
}

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black">
      <Header heroRef={ref as React.RefObject<HTMLElement>} />
      <div className="absolute inset-0">
        <AspectRatio ratio={16 / 9} className="h-full md:block hidden">
          <img 
            src="/Testify-16-9.JPG"
            alt="SAUDA Hero - Desktop"
            className="w-full h-full object-cover object-center"
          />
        </AspectRatio>
        <AspectRatio ratio={2 / 3} className="h-full md:hidden block">
          <img 
            src="/Testify-2-3.JPG"
            alt="SAUDA Hero - Mobile"
            className="w-full h-full object-cover object-center"
          />
        </AspectRatio>
      </div>
    </section>
  );
});

export default HeroSection; 