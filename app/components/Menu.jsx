"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { sliderLists } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCocktails = sliderLists.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;

    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffSet) => {
    return sliderLists[
      (currentIndex + indexOffSet + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(+1);

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.inOut" });
    gsap.fromTo(
      ".cocktailIMG",
      { opacity: 0, xPercent: -100 },
      { xPercent: 0, opacity: 1, duration: 1, ease: "power.inOut" }
    );
    gsap.fromTo(
      ".details h2",
      { opacity: 0, yPercent: 50 },
      { opacity: 1, yPercent: 0, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".details p",
      { opacity: 0, yPercent: 50 },
      { opacity: 1, yPercent: 0, ease: "power1.inOut" }
    );
  }, [currentIndex]);
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <div id="m-left-leaf" className="size-40 md:size-60">
        <Image src="/images/slider-left-leaf.png" alt="left-leaf" fill />
      </div>
      <div id="m-right-leaf" className="size-40 md:size-60">
        <Image src="/images/slider-right-leaf.png" alt="right-leaf" fill />
      </div>

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="cocktail flex-col">
          <div className="relative object-contain w-[60vw] h-[60vh]">
            <Image
              src={currentCocktail.image}
              alt={currentCocktail.image}
              className="cocktailIMG"
              fill
            />
          </div>

          <div className="recipe">
            <div ref={contentRef} className="info">
              <p>Recipe fofr:</p>
              <p id="title">{currentCocktail.name}</p>
            </div>

            <div className="details">
              <h2>{currentCocktail.title}</h2>
              <p>{currentCocktail.description}</p>
            </div>
          </div>
        </div>

        <div className="arrows bottom-50">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <div className="relative size-10">
              <Image
                src="/images/right-arrow.png"
                alt="right-arrow"
                aria-hidden="true"
                fill
              />
            </div>
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <div className="relative size-10">
              <Image
                src="/images/left-arrow.png"
                alt="left-arrow"
                aria-hidden="true"
                fill
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
