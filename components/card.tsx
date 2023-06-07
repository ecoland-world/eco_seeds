import Image from "next/image"
import Link from "next/link"
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
import { Progress } from "@/components/ui/progress"

interface CardProps {
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

export function CardComponent({ project }: any) {
  return (
    <>
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
    </>
  )
}
