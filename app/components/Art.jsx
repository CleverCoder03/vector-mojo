"use client";
import React from "react";
import { featureLists, goodLists } from "../constants";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Art = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const start = isMobile ? "top 5%" : "top top";

    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",
        start,
        end: "bottom center",
        scrub: 1.5,
        pin: true,
      },
    });

    maskTimeline
      .to(".will-fade", {
        opacity: 0,
        stagger: 0.2,
        ease: "power1.inOut",
      })
      .to(".masked-img", {
        scale: 1.3,
        maskPosition: "center",
        maskSize: "400%",
        duration: 1,
        ease: "power1.inOut",
      })
      .to("#masked-content", { opacity: 1, duration: 1, ease: "power1.inOut" });
  });
  return (
    <div id="art">
      <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade">The ART</h2>
        <div className="content">
          <ul className="space-y-4 will-fade">
            {goodLists.map((features, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="relative size-3">
                  <Image src="/images/check.png" alt="check-img" fill />
                </div>
                <p>{features}</p>
              </li>
            ))}
          </ul>

          <div className="cocktail-img">
            <div className="abs-center masked-img size-full object-contain">
              <Image src="/images/under-img.jpg" alt="Cocktail-img" fill />
            </div>
          </div>

          <ul className="space-y-4 will-fade">
            {featureLists.map((features, index) => (
              <li key={index} className="flex items-center justify-start gap-2">
                <div className="relative size-3">
                  <Image src="/images/check.png" alt="check-img" fill />
                </div>
                <p className="md:w-fit w-60">{features}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="masked-container">
          <h2 className="will-fade">Sip-worthy Perfection</h2>
          <div id="masked-content">
            <h3>Made with Craft, Poured with Passion</h3>
            <p>
              This isn't just a drink, It's a carefully crafted moment made just
              for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art;
