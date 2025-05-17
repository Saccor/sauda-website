import React, { forwardRef } from "react";
import Image from "next/image";

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section 
      ref={ref} 
      className="relative w-full h-screen overflow-hidden bg-gradient-hero"
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/Testify-16-9.JPG"
          alt="SAUDA Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="space-y-8">
          {/* Hero content goes here */}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection; 