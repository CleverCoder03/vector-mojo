"use client";
import Link from "next/link";
import React from "react";
import { navLinks } from "../constants";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo('nav', {background: 'transparent'}, {
        backgroundColor: "#00000050",
        backgroundFilter: "blur(10px)",
        duration: 1,
        ease: 'power1.inOut'
    })
  }, []);
  return (
    <nav>
      <div>
        <Link href="#" className="flex items-center gap-2">
          <div className="relative size-10">
            <Image src="/images/logo.png" alt="Vector Mojo" fill />
          </div>
          <p>Vector Mojo</p>
        </Link>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link href={`#${link.id}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
