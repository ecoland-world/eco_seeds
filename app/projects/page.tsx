'use client'
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle2,
  Clock,
  DollarSign,
  Info,
  Leaf,
  Users,
} from "lucide-react"

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
import { Progress } from "@/components/ui/progress"

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
  nct: boolean
  contractAddress?: string
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
    nct: false,
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
      currency: "CELO",
    },
    saleStartDate: new Date("2023-06-01T21:34"),
    saleEndDate: new Date("2023-06-30T21:34"),
    nct: true,
  },
  {
    id: "3",
    name: "SecureDEX",
    description: "Highly secure decentralized exchange",
    logo: "https://dummyimage.com/50x50",
    roundName: "Private",
    isPublic: false,
    participants: 25,
    raisedAmount: {
      currentAmount: 10000,
      targetAmount: 50000,
      currency: "BTC",
    },
    saleStartDate: new Date("2023-06-01T21:34"),
    saleEndDate: new Date("2023-06-30T21:34"),
    nct: false,
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

const ProjectsPage = () => {
  const [projects, setProjects] = React.useState<OngoingProjects[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError]: any = React.useState("")

  React.useEffect(() => {
    setLoading(true)
    async function getData() {
      try {
        
        const projects = fetch("http://localhost:3000/api/projects")
        .then((res) => res.json())
        .then((data) => {
          setProjects(data.data)
        })
        return { projects };
      } catch (err) {
        setError(err)
      } 
    }
 
    getData()
  }, [])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:grid-cols-2 md:py-10 xl:grid-cols-3">
      {projects.map((project, index) => (
        <Card
          className={cn(
            `w-[380px] ${project.nct && "bg-[#ecec7b] dark:bg-[#0A1F04]"}`
          )}
          key={project.id}
        >
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Image
                src="https://dummyimage.com/50x50"
                alt=""
                width={50}
                height={50}
              />
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <div>{project.name}</div>{" "}
                  <CheckCircle2 className="text-green-400" />
                  {project.nct && (
                    <Image src="/nct.png" alt="" width={25} height={25} />
                  )}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0">
                <Leaf className="flex translate-y-1 text-[#23e7c3]" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Round Name</p>
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
                  <p className="text-sm font-medium leading-none">Sale End</p>
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
                className: "w-full",
              })}
              href={`/projects/${project.id}`}
            >
              <Info className="mr-2 h-4 w-4" /> View Details
            </Link>
          </CardFooter>
        </Card>
      ))}
      {ongoingProjects.map((project, index) => (
        <Card
          className={cn(
            `w-[380px] ${project.nct && "bg-[#ecec7b] dark:bg-[#0A1F04]"}`
          )}
          key={project.id}
        >
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Image
                src="https://dummyimage.com/50x50"
                alt=""
                width={50}
                height={50}
              />
              <div>
              <CardTitle className="flex items-center space-x-2">
                  <div>{project.name}</div>{" "}
                  <CheckCircle2 className="text-green-400" />
                  {project.nct && (
                    <Image src="/nct.png" alt="" width={25} height={25} />
                  )}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0">
                <Leaf className="flex translate-y-1 text-[#23e7c3]" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Round Name</p>
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
                  <p className="text-sm font-medium leading-none">Sale End</p>
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
                className: "w-full",
              })}
              href={`/projects/${project.id}`}
            >
              <Info className="mr-2 h-4 w-4" /> View Details
            </Link>
          </CardFooter>
        </Card>
      ))}
      {ongoingProjects.map((project, index) => (
        <Card
          className={cn(
            `w-[380px] ${project.nct && "bg-[#ecec7b] dark:bg-[#0A1F04]"}`
          )}
          key={project.id}
        >
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Image
                src="https://dummyimage.com/50x50"
                alt=""
                width={50}
                height={50}
              />
              <div>
              <CardTitle className="flex items-center space-x-2">
                  <div>{project.name}</div>{" "}
                  <CheckCircle2 className="text-green-400" />
                  {project.nct && (
                    <Image src="/nct.png" alt="" width={25} height={25} />
                  )}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0">
                <Leaf className="flex translate-y-1 text-[#23e7c3]" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Round Name</p>
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
                  <p className="text-sm font-medium leading-none">Sale End</p>
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
                className: "w-full",
              })}
              href={`/projects/${project.id}`}
            >
              <Info className="mr-2 h-4 w-4" /> View Details
            </Link>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}

export default ProjectsPage
