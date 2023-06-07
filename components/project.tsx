import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import React, { useCallback, useEffect, useRef, useState } from "react"
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
import { useToast } from "@/components/ui/use-toast"
import TransactionInterface from "@/components/transactions/example"

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

export function ProjectComponent({ project }: any) {
  return (
    <>
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
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#23e7c3]">Invest</Button>
                </DialogTrigger>
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
              <Button className="w-full border-[#23e7c3]" variant={"outline"}>
                Claim
              </Button>
            </div>
          </CardContent>
          <CardContent className={cn("w-1/2 p-6")}>
            <div className="grid grid-cols-2 gap-6 rounded-md bg-[#B3C6AD] p-6 dark:bg-green-900">
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

                {isConnected && <TransactionInterface />}
              </div>
            </div>
          </CardContent>
        </Card>
    </>
  )
}
