"use client"

import { useCallback, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Loader2 } from "lucide-react"
import ReactCanvasConfetti from "react-canvas-confetti"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  fullName: z.string({ required_error: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  title: z.string({ required_error: "Title is required" }),
  telegramUser: z.string().optional(),
  projectName: z.string({ required_error: "Project Name is required" }),
  projectDescription: z.string({ required_error: "Description is required" }),
  tokenInfo: z.string({ required_error: "Token Information is required" }),
  targetRaise: z.string({ required_error: "Target Raise Amount is required" }),
  chain: z.string(),
  projectStatus: z.string(),
  raisedBefore: z.string(),
  projectType: z.string(),
  websiteUrl: z.string().url().optional(),
  whitepaperUrl: z.string().url().optional(),
  projectTwitter: z.string().url().optional(),
  projectTelegram: z.string().url().optional(),
  projectGithub: z.string().url().optional(),
})

const ApplyPage = () => {
  const refAnimationInstance = useRef(null)

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      title: "",
      telegramUser: "",
      projectName: "",
      projectDescription: "",
      tokenInfo: "",
      targetRaise: "",
      chain: "",
      projectStatus: "",
      raisedBefore: "",
      projectType: "",
      websiteUrl: "",
      whitepaperUrl: "",
      projectTwitter: "",
      projectTelegram: "",
      projectGithub: "",
    },
  })

  const { isSubmitting } = form.formState
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/apply", values)
      if (res.status === 200) {
        fire()
        form.reset()
        setSubmitted(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center space-y-8 py-8">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Apply for{" "}
        <span className="bg-gradient-to-r from-[#23e761] to-[#23e7c3] bg-clip-text text-transparent">
          EcoSeeds
        </span>
      </h1>
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
      <p className="w-[700px] text-center">
        Ecoseeds provides a platform that utilizes custom tokens, lock periods,
        and proof of work to facilitate crowd-funding for ecological projects.
        Apply below and we will chat soon!
      </p>
      {submitted ? (
        <div className="flex flex-col items-center justify-center space-y-8 py-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl">
            Thank you for applying! We will get in touch shortly.
          </h1>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("w-[580px] space-y-8")}
          >
            <div className="flex flex-col space-y-4">
              <h1 className={cn("text-2xl")}>Contact Information</h1>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegramUser"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Telegram User" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className={cn("text-2xl")}>Project Information</h1>
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Project Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Project Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tokenInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Token Information" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetRaise"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Target Raise Amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="chain"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Chain" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CELO">CELO</SelectItem>
                          <SelectItem value="Polygon">Polygon</SelectItem>
                          <SelectItem value="ETH">ETH</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectStatus"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Project Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ready">Ready to Launch</SelectItem>
                          <SelectItem value="early">
                            In Early Development
                          </SelectItem>
                          <SelectItem value="idea">
                            Idea with Whitepaper
                          </SelectItem>
                          <SelectItem value="initial">
                            Just an Initial Idea
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="raisedBefore"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Raised Before?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="ProjectType" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ICO">ICO</SelectItem>
                          <SelectItem value="IDO">IDO</SelectItem>
                          <SelectItem value="IGO">IGO</SelectItem>
                          <SelectItem value="incubatedIGO">
                            Incubated IGO
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Website URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whitepaperUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Whitepaper URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectTwitter"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Project Twitter" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectTelegram"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Project Telegram" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectGithub"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Project Github" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Apply"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default ApplyPage
