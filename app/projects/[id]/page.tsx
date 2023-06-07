// allows to render server side props on client side
"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { ethers } from "ethers"
import { usePathname  } from 'next/navigation';
import Image from "next/image"
import Link from "next/link"
import icon from "@/public/1.png"
import { zodResolver } from "@hookform/resolvers/zod"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  Coins,
  DollarSign,
  Github,
  Globe,
  Linkedin,
  Paperclip,
  PieChart,
  Send,
  Twitter,
} from "lucide-react"
import ReactCanvasConfetti from "react-canvas-confetti"
import { useForm } from "react-hook-form"
import { useAccount } from "wagmi"
import * as z from "zod"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import TransactionInterface from "@/components/transactions/example"
import InvestComponent from "@/components/transactions/invest"
require('dotenv').config()


const FormSchema = z.object({
  amount: z.coerce.number({ required_error: "Enter an amount" }),
  chain: z.string({ required_error: "Select a chain" }),
})

function convertTimestamp(timestamp: any) {
  var d = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),         // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
      ampm = 'AM',
      time;

  if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
  } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
  } else if (hh == 0) {
      h = 12;
  }

  // ie: 2014-03-24, 3:00 PM
  time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
  return time;
}

/* 
get it from the Sales mapping in the contract
struct Sale {
        address owner;
        bool acceptsNct;
        bool open;
        uint256 pricePerUnitInNativeToken;
        uint256 lockInEnd;
        uint256 maxAmount;
        uint256 sold;
    }
    gonna render owner, - at box
    acceptsNct, -changes color
    open, -changes color
    pricePerUnitInNativeToken, - at box
    lockInEnd, - at box
    maxAmount, - at box (total) supply
    sold, - at box

    invest button - if open - purchases tokens
    if closed - shows sold out

    if acceptsNct - shows nct button
    if not - shows nct button but disabled
    
*/


interface ProjectProps {
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

const ProjectDetailsPage = ( { props }: any ) => {
  const refAnimationInstance = useRef(null)

  const { address, isDisconnected } = useAccount()
  const [saleData, setSaleData]: any = useState("")
  const [tokenContract, setTokenContract]: any = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [lockFinish, setLockFinish]:any = useState(0)
  
  const router = usePathname ();

  React.useEffect(() => {
    
    const calls = async () => {
    const id = router?.split("projects/")[1];
  
    fetch("http://localhost:3000/api/sales?sale=" + id)
    .then((res) => res.json())
    .then((data) => {
      setTokenContract(data.data.contract)
     
    const info = fetch("http://localhost:3000/api/contractdata?contract=" + data.data.contract)
    .then((res) => res.json())
    .then((data) => {

      setSaleData(data.data)
      const date = convertTimestamp(parseInt(BigInt(data.data[4].hex).toString()))
      setLockFinish(date)
      setIsLoaded(true)
    })
      
    })
  }
  calls()
  }, []);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      // @ts-ignore
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [makeShot])

  const [reward, setReward] = useState(0)
  const { isConnected } = useAccount()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset()
    fire()
  }
  const { toast } = useToast()
  const shortenTxAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const showToast = () => {
    toast({
      title: "Transaction Successful",
      description: shortenTxAddress(
        "0x5bda49baf86f7c152063a2dc7945a1f0e7ff51565fd4fac7b9938c98724c214e"
      ),
      variant: "success",
      action: (
        <ToastAction altText="Explorer">
          <Link
            target="_blank"
            href={`https://alfajores.celoscan.io/tx/0x5bda49baf86f7c152063a2dc7945a1f0e7ff51565fd4fac7b9938c98724c214e`}
          >
            Explore
          </Link>
        </ToastAction>
      ),
    })
  }
  if (isLoaded){
  return (
  
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 999,
        }}
      />
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
                <CardDescription className="text-md">
                  Total Invested: <strong>123</strong>
                </CardDescription>
                <CardDescription className="text-md">
                  Expected Reward: <strong>123</strong>
                </CardDescription>
                <CardDescription className="text-md">
                  Release Date: <strong>01/06/2023, 18:34</strong>
                </CardDescription>
              </div>
            </div>

            <div className="flex w-1/2 space-x-2">
              <Dialog>
                
                  <Button className="w-full bg-[#23e7c3]">
                  {isConnected && <InvestComponent
                    amount={"0.001"}
                    token = {tokenContract}

                  />}
                  </Button>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Invest in Project</DialogTitle>
                    <DialogDescription>
                      Please confirm how much you want to invest to the project
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="grid gap-4 py-4"
                    >
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="0.5"
                                {...field}
                                type="number"
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="chain"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue="CELO"
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Chain" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="CELO">CELO</SelectItem>
                                <SelectItem value="Polygon">NCT</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {/* Update state of expected reward */}
                              Estimated Reward: <strong>{reward}</strong>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Confirm</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <Button
                className="w-full border-[#23e7c3]"
                variant={"outline"}
                onClick={showToast}
              >
                Claim
              </Button>
            </div>
          </CardContent>
          <CardContent className={cn("w-1/2 p-6")}>
            <div className="grid grid-cols-2 gap-6 rounded-md bg-[#B3C6AD] p-6 dark:bg-green-900">
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">Token Limit</h1>
                <p className="font-bold">{ethers.utils.formatEther(BigInt(saleData[5].hex).toString())}</p>
              </div>
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">Accepts NCT</h1>
                <p className="font-bold">False</p>
              </div>
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">Lock finish</h1>
                <p className="font-bold">{lockFinish}</p>
              </div>
              <div className="space-y-1 rounded-md bg-background p-4">
                <h1 className="font-bold text-[#23e7c3]">Sold</h1>
                <p className="font-bold">{(BigInt(saleData[6].hex).toString())}</p>
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
                <h3>{ethers.utils.formatEther(BigInt(saleData[3].hex).toString())} CELO</h3>
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
                <PieChart />
              </div>
              <div className="flex w-full flex-row items-center justify-between">
                <CardTitle>Pool % Owned:</CardTitle>
                <h3>0.1% / 100 Bzon</h3>
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
  )}
}



export default ProjectDetailsPage
