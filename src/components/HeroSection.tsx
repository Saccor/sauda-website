import Header from "./Header";
import React, { forwardRef } from "react";

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black mb-0 pb-0">
      <Header heroRef={ref as React.RefObject<HTMLElement>} />
      <div className="absolute inset-0 h-full w-full">
        <picture>
          <source media="(max-width: 767px)" srcSet="/Testify-2-3.JPG" />
          <img 
            src="/Testify-16-9.JPG"
            alt="SAUDA Hero"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>
    </section>
  );
});

export default HeroSection; 