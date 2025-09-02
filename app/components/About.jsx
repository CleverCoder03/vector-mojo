"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#about h2", {
      type: "words",
    });

    const scrollTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeLine
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        yPercent: 100,
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
          stagger: 0.04,
        },
        "-=0.5"
      );
  });
  return (
    <div id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Cocktails</p>
            <h2>
              Where every detail matters <span className="text-white">-</span>{" "}
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with
              details - from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>

            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100 ">
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy">
            <Image src="/images/abt1.png" alt="abt-img-1" fill />
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="noisy">
            <Image src="/images/abt2.png" alt="abt-img-2" fill />
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="noisy">
            <Image src="/images/abt5.png" alt="abt-img-5" fill />
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy">
            <Image src="/images/abt3.png" alt="abt-img-3" fill />
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="noisy">
            <Image src="/images/abt4.png" alt="abt-img-4" fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
