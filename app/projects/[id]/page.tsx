// allows to render server side props on client side
'use client';

import React from "react"
import Image from "next/image"
import Link from "next/link"
import icon from "@/public/1.png"
import {
  Coins,
  DollarSign,
  Github,
  Globe,
  Linkedin,
  Paperclip,
  Send,
  Twitter,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAccount } from "wagmi";
import TransactionInterface from "@/components/transactions/example"

const ProjectDetailsPage = () => {
  const { isConnected } = useAccount();
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div>
        <Card className="flex">
          <CardContent className={cn("flex w-1/2 flex-col space-y-10 p-6")}>
            <div className="grid grid-cols-6 gap-2">
              <Image
                src={icon}
                alt=""
                className="rounded-md border border-[#B3C6AD]"
              />
              <div className="col-span-5 space-y-2">
                <CardTitle>Dexer Xone (Bzon)</CardTitle>
                <CardDescription className="text-md">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
                  sit possimus quam? Facere, ipsum! Facilis fuga quisquam,
                  impedit repellat eos atque libero tenetur nihil neque
                  voluptates consectetur facere exercitationem architecto!
                </CardDescription>
              </div>
            </div>

            <div className="flex w-1/2 space-x-2">
              <Button className="w-full bg-[#23e7c3]">Claim</Button>
              <Button className="w-full border-[#23e7c3]" variant={"outline"}>
                Stake
              </Button>
            </div>
          </CardContent>
          <CardContent className={cn("w-1/2 p-6")}>
            <div className="grid grid-cols-2 gap-6 rounded-md bg-[#B3C6AD] p-6">
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">Total Supply</h1>
                <p className="font-bold">1,000,000,000 Bzon</p>
              </div>
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">FDV</h1>
                <p className="font-bold">30M USD</p>
              </div>
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">Initial Supply</h1>
                <p className="font-bold">1,300,000,0 Bzon</p>
              </div>
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">Initial Market Cap</h1>
                <p className="font-bold">6.48M USD</p>
              </div>
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">New Sale Button</h1>
       
                {isConnected && <TransactionInterface/>}
            
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center space-x-1">
              <div className="rounded-md bg-[#23e7c3] p-2">
                <DollarSign />
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <CardTitle>Token Price:</CardTitle>
                <h3>0.25 USD</h3>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center space-x-1">
              <div className="rounded-md bg-[#23e7c3] p-2">
                <Coins />
              </div>
              <CardTitle>30% at TGE, evenly per quarter 4 quarters</CardTitle>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center space-x-1">
              <div className="rounded-md bg-[#23e7c3] p-2">
                <DollarSign />
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <CardTitle>Token Price:</CardTitle>
                <h3>0.25 USD</h3>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Socials:</CardTitle>
            <div className="grid grid-cols-5 gap-2">
              <Button
                className="border-[#23e7c3] hover:bg-[#23e7c3]"
                variant={"outline"}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                className="border-[#23e7c3] hover:bg-[#23e7c3]"
                variant={"outline"}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                className="border-[#23e7c3] hover:bg-[#23e7c3]"
                variant={"outline"}
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                className="border-[#23e7c3] hover:bg-[#23e7c3]"
                variant={"outline"}
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button
                className="border-[#23e7c3] hover:bg-[#23e7c3]"
                variant={"outline"}
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardHeader>
            <CardTitle>Web:</CardTitle>
            <div className="flex flex-row items-center space-x-1">
              <Globe className="h-4 w-4" />
              <Link href={"https:/example.com"} className="hover:underline">
                https://example.com
              </Link>
            </div>
          </CardHeader>
          <Separator />
          <CardHeader>
            <CardTitle>Whitepaper:</CardTitle>
            <div className="flex flex-row items-center space-x-1">
              <Paperclip className="h-4 w-4" />
              <Link href={"https:/example.com"} className="hover:underline">
                https://example.com
              </Link>
            </div>
          </CardHeader>
        </Card>
        {/* About Sectoin */}
        <Card className="col-span-2 p-6">
          <h2 className="scroll-m-20 border-b border-[#B3C6AD] pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            About
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
            laudantium porro delectus soluta placeat aliquam aut ratione
            inventore facilis temporibus? Maiores numquam aliquid temporibus a.
            Eligendi commodi id harum dicta. The king thought long and hard, and
            finally came up with{" "}
            <a
              href="#"
              className="font-medium text-primary underline underline-offset-4"
            >
              a brilliant plan
            </a>
            : he would tax the jokes in the kingdom.
          </p>
          <Image
            src={"https://dummyimage.com/640x360/000/fff"}
            alt=""
            className="h-auto w-full"
            width={640}
            height={360}
          />
        </Card>
        <Card className="col-span-2 col-start-2 p-6">
          <h2 className="scroll-m-20 border-b border-[#B3C6AD] pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            BZON Token Details
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The kings subjects were not amused. They grumbled and complained,
            but the king was firm:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>1st level of puns: 5 gold coins</li>
            <li>2nd level of jokes: 10 gold coins</li>
            <li>3rd level of one-liners : 20 gold coins</li>
          </ul>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            As a result, people stopped telling jokes, and the kingdom fell into
            a gloom. But there was one person who refused to let the kings
            foolishness get him down: a court jester named Jokester.
          </p>
        </Card>
        <Card className="col-span-2 col-start-2 p-6">
          <h2 className="scroll-m-20 border-b border-[#B3C6AD] pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Roadmap
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
            delectus maiores quae nostrum cum eum ipsum doloremque alias! Quia
            quisquam, voluptatibus perferendis maxime adipisci dicta beatae
            deleniti ut corrupti eveniet.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque
            delectus maiores quae nostrum cum eum ipsum doloremque alias! Quia
            quisquam, voluptatibus perferendis maxime adipisci dicta beatae
            deleniti ut corrupti eveniet.
          </p>
        </Card>
        <Card className="col-span-2 col-start-2 p-6">
          <h2 className="scroll-m-20 border-b border-[#B3C6AD] pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Backers
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The people of the kingdom, feeling uplifted by the laughter, started
            to tell jokes and puns again, and soon the entire kingdom was in on
            the joke.
          </p>
          <div className="my-6 w-full overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="m-0 border-t p-0 even:bg-[#B3C6AD]">
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Kings Treasury
                  </th>
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Peoples happiness
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="m-0 border-t p-0 even:bg-[#B3C6AD]">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Empty
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Overflowing
                  </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-[#B3C6AD]">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Modest
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Satisfied
                  </td>
                </tr>
                <tr className="m-0 border-t p-0 even:bg-[#B3C6AD]">
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Full
                  </td>
                  <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                    Ecstatic
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The king, seeing how much happier his subjects were, realized the
            error of his ways and repealed the joke tax. Jokester was declared a
            hero, and the kingdom lived happily ever after.
          </p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            The moral of the story is: never underestimate the power of a good
            laugh and always be careful of bad ideas.
          </p>
        </Card>
      </div>
    </section>
  )
}

export default ProjectDetailsPage
