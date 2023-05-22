"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import among_nature from "@/public/among_nature.svg"
import ar from "@/public/ar.svg"
import world_is_mine from "@/public/world_is_mine.svg"

import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    const getRandomImage = () => {
      const images = [ar, among_nature, world_is_mine]
      const randomIndex = Math.floor(Math.random() * images.length)
      const selectedImage = images[randomIndex]
      setImageUrl(selectedImage)
    }

    getRandomImage()
  }, [])
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-7xl flex-row items-start gap-10">
        <div className="max-w-xl flex-col space-y-10">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Unlock Power of{" "}
            <span className="bg-gradient-to-r from-[#23e761] to-[#23e7c3] bg-clip-text text-transparent">
              ReFi
            </span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#23e761] to-[#23e7c3] bg-clip-text text-transparent">
              Invest
            </span>{" "}
            in a Future That Thrives
          </h1>
          <p>
            Welcome to EcoSeeds, ReFi Launchpad, where we empower you to reshape
            finance for a better future.
          </p>
          <Link href="/projects" className={buttonVariants({ size: "lg" })}>
            Explore Projects
          </Link>
        </div>

        <div className="max-w-3xl">
          <Image src={imageUrl} alt="" className="" />
        </div>
      </div>
    </section>
  )
}
