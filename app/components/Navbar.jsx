"use client";
import Link from "next/link";
import { navLinks } from "../constants";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useWindowScroll } from "react-use";

const Navbar = () => {
  const navRef = useRef(null);
  const {y: currentScrollY} = useWindowScroll()

  useEffect(()=>{
    if (currentScrollY == 0)
      navRef.current.classList.remove("nav-active")
    else if(currentScrollY >= 50)
      navRef.current.classList.add("nav-active")
  }, [currentScrollY])

  return (
    <nav ref={navRef}>
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="#" className="flex items-center gap-2">
          <div className="relative size-10">
            <Image src="/images/logo.png" alt="Vector Mojo" fill />
          </div>
          <p className="font-semibold">Vector Mojo</p>
        </Link>

        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link href={`#${link.id}`} className="hover:text-gray-300">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
