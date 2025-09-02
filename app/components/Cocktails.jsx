"use client"
import Image from "next/image";
import { cocktailLists, mockTailLists } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Cocktails = () => {
  useGSAP(() => {
    const parallaxTimline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    parallaxTimline.from("#c-left-leaf", {
      x: 500,
      y: 100,
    }).from("#c-right-leaf", {
        x: 100, y:100
    });
  }, []);
  return (
    <section id="cocktails" className="noisy">
      <div
        className="absolute left-0 md:bottom-0 md:top-auto -top-20 md:size-56 hidden"
        id="c-left-leaf"
      >
        <Image
          src="/images/cocktail-left-leaf.png"
          alt="cocktail-left-leaf"
          fill
        />
      </div>
      <div
        className="absolute right-0 md:bottom-0 md:top-auto -top-20 md:size-56 hidden"
        id="c-right-leaf"
      >
        <Image
          src="/images/cocktail-right-leaf.png"
          alt="cocktail-right-leaf"
          fill
        />
      </div>

      <div className="list">
        <div className="popular">
          <h2>Most popular cocktails:</h2>

          <ul>
            {cocktailLists.map((drink) => (
              <li key={drink.name}>
                <div className="md:me-28">
                  <h3>{drink.name}</h3>
                  <p>
                    {drink.country} | {drink.detail}
                  </p>
                </div>
                <span>- {drink.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Most loved mocktails:</h2>

          <ul>
            {mockTailLists.map((drink) => (
              <li key={drink.name}>
                <div className="me-28">
                  <h3>{drink.name}</h3>
                  <p>
                    {drink.country} | {drink.detail}
                  </p>
                </div>
                <span>- {drink.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
