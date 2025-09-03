"use client"
import Link from "next/link"
import { openingHours, socials } from "../constants"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
    useGSAP(()=>{
        const titleSplit = SplitText.create("#contact h2", {type: "words"})

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top center"
            },
            ease: "power1.inOut"
        })

        timeline.from(titleSplit.words, {
            opacity: 0, yPercent: 100, stagger: 0.05
        }).from("#contact h3, #contact p", {
            opacity: 0, yPercent: 100, stagger: 0.05
        })
    })
  return (
    <footer id='contact'>
        <div className="content">
            <h2>Where to find us</h2>

            <div>
                <h3>Visit our bar</h3>
                <p>456, Raq Blvd. #303 Los Angeles, CA 91209</p>
            </div>

            <div>
                <h3>Contact us</h3>
                <p>7249084224</p>
                <p>clevercoder0307@gmail.com</p>
            </div>

            <div>
                <h3>Open Every Day</h3>
                {openingHours.map((time)=>(
                    <p key={time.day}>
                        {time.day} : {time.time}
                    </p>
                ))}
            </div>

            <div>
                <h3>Socials</h3>

                <div className="flex-center gap-5">
                    {socials.map((social)=>(
                        <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                            <div className="relative size-5">
                                <Image src={social.icon} alt={social.name} fill/>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Contact