import React, { forwardRef } from "react";
import Image from "next/image";

const HeroSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden bg-black mb-0 pb-0">
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
      </div>
    </section>
  );
});

export default HeroSection; 