"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import among_nature from "@/public/among_nature.svg"
import ar from "@/public/ar.svg"
import world_is_mine from "@/public/world_is_mine.svg"
import { Progress } from "@radix-ui/react-progress"
import { Clock, DollarSign, Info, Leaf, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type OngoingProjects = {
  id: string
  name: string
  description: string
  logo: string
  roundName: string
  isPublic: boolean
  participants: number
  raisedAmount: {
    currentAmount: number
    targetAmount: number
    currency: string
  }
  saleStartDate: Date
  saleEndDate: Date
}

const ongoingProjects: OngoingProjects[] = [
  {
    id: "1",
    name: "SpeeDEX",
    description: "Fastest DEX with impact",
    logo: "https://dummyimage.com/50x50",
    roundName: "Public",
    isPublic: true,
    participants: 42,
    raisedAmount: {
      currentAmount: 3000,
      targetAmount: 15000,
      currency: "CELO",
    },
    saleStartDate: new Date("2023-06-01T21:34"),
    saleEndDate: new Date("2023-06-30T21:34"),
  },
  {
    id: "2",
    name: "QuickSwap",
    description: "DEX with lightning speed",
    logo: "https://dummyimage.com/50x50",
    roundName: "Public",
    isPublic: true,
    participants: 60,
    raisedAmount: {
      currentAmount: 5000,
      targetAmount: 20000,
      currency: "ETH",
    },
    saleStartDate: new Date("2023-06-01T21:34"),
    saleEndDate: new Date("2023-06-30T21:34"),
  },
]
const notifications = [
  {
    title: "Round Name",
    description: "Public",
  },
  {
    title: "Participants",
    description: "42",
  },
  {
    title: "Raised Amount",
    description: "3000 / 15000 CELO",
  },
]

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
      <div className="mt-20">
        <div className="items-top grid grid-cols-3 gap-4">
          <div className="flex flex-col px-10">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-[#23e7c3]">
              Trending
            </h4>
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Most Popular IDO Projects
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax.
            </p>
          </div>
          {ongoingProjects.map((project, index) => (
            <Card className={cn("w-[380px]")} key={project.id}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Image
                    src="https://dummyimage.com/50x50"
                    alt=""
                    width={50}
                    height={50}
                  />
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0">
                    <Leaf className="flex translate-y-1 text-[#23e7c3]" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Round Name
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.roundName}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0">
                    <Users className="flex translate-y-1 text-[#23e7c3]" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Participants
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.participants}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0">
                    <Clock className="flex translate-y-1 text-[#23e7c3]" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Sale End
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.saleStartDate.toLocaleString("en-GB", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "UTC",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0">
                    <DollarSign className="flex translate-y-1 text-[#23e7c3]" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Raised Amount
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.raisedAmount.currentAmount} /{" "}
                        {project.raisedAmount.targetAmount}{" "}
                        {project.raisedAmount.currency}
                      </p>
                    </div>
                  </div>
                </div>
                <Progress value={33} />
              </CardContent>
              <CardFooter>
                <Link
                  className={buttonVariants({
                    variant: "default",
                    className: "",
                  })}
                  href={`/projects/${project.id}`}
                >
                  <Info className="mr-2 h-4 w-4" /> View Details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Card className="mt-24 flex flex-col items-center justify-center space-y-3 bg-card py-10">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-[#23e761]">
            Have a project?
          </h4>
          <h2 className="scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
            Apply For ICO/IDO
          </h2>
          <Button>
            <Link href="/apply">Apply To Launch</Link>
          </Button>
        </Card>
      </div>
    </section>
  )
}
