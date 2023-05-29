"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
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

  // create function to submit form data to api with a post request to the /api/apply endpoint
// const submitForm = async (data) => {
//   try {
//     const res = await axios.post("/api/apply", data);
//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// };
const submitForm = async (data: any) => {
  try {
    const res = await axios.post("/api/apply", data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values)
    try {
      const res = await axios.post("/api/apply", values);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center space-y-8 py-8">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        Apply to be listed
      </h1>
      <p className="w-[700px] text-center">
        Ecoseeds provides a platform that utilizes custom tokens, lock periods,
        and proof of work to facilitate crowd-funding for ecological projects.
        Apply below and we will chat soon!
      </p>
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
          <Button type="submit" >Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default ApplyPage
