"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef();
  const videoContainerRef = useRef()

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      stagger: 0.06,
      ease: "expo.out",
      delay: 1,
    });

    gsap.from(videoRef.current, {
      opacity: 0,
      yPercent: 150,
      duration: 1.5,
      ease: "expo.out",
      delay: 1.2
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
          // markers: true
        },
      })
      .to(".right-leaf", { y: 300 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    // const startValue = isMobile ? "top 50%" : "center 60%";
    // const endValue = isMobile ? "120% top" : "bottom top";

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: "video",
    //     start: startValue,
    //     end: endValue,
    //     scrub: true,
    //     pin: true,
    //     markers: true,
    //   },
    // });

    // videoRef.current.onloadedmetadata = () => {
    //   tl.to(videoRef.current, {currentTime: videoRef.current.duration})
    // };

    const setupVideoAnimation = () => {
      const video = videoRef.current;
      if (!video) return;

      const startValue = isMobile ? "top top" : "center 60%";
      const endValue = isMobile ? "120% top" : "bottom top";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: videoContainerRef.current, // Target the container
          start: startValue,
          end: endValue,
          scrub: true, // Smoother scrubbing
          markers: true,
          pin: true,
          onUpdate: (self) => {
            // Update video time based on scroll progress
            if (video.duration) {
              video.currentTime = video.duration * self.progress;
            }
          }
        },
      });

      return tl;
    };

    // Wait for video metadata to load before setting up animation
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 1) {
        // Metadata already loaded
        setupVideoAnimation();
      } else {
        // Wait for metadata to load
        video.addEventListener('loadedmetadata', setupVideoAnimation, { once: true });
      }
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title uppercase">S'Mojo</h1>
        <div className="left-leaf">
          <Image src="/images/hero-left-leaf.png" alt="left-leaf" fill />
        </div>
        <div className="right-leaf">
          <Image src="/images/hero-right-leaf.png" alt="right-leaf" fill />
        </div>
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crispy. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer.
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes - Designed to delight your
                senses.
              </p>
              <Link href="#cocktails">View Cocktails</Link>
            </div>
          </div>
        </div>
      </section>
      {/* <div ref={videoContainerRef}  className="w-screen h-screen md:h-[60%] top-0 left-0 absolute flex items-center justify-center"  >
        <video
          className="fixed bottom-0"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div> */}
     </>
  );
};

export default Hero;
