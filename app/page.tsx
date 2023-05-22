import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-7xl flex-row items-start gap-10">
        <div className="max-w-xl flex-col space-y-10">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Unlock Power of{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ReFi
            </span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Invest
            </span>{" "}
            in a Future That Thrives
          </h1>
          <p>
            Welcome to EcoSeeds, ReFi Launchpad, where we empower you to reshape
            finance for a better future.
          </p>
        </div>

        <div className="max-w-3xl text-lg text-foreground sm:text-xl">
          <Image
            src="https://dummyimage.com/640x360"
            alt=""
            width={700}
            height={360}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: "lg" })}
        >
          CDocs
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ size: "lg", variant: "secondary" })}
        >
          GitHub
        </Link>
      </div>
    </section>
  )
}
