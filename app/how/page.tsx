"use client"

import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type AccordionItems = {
  trigger: string
  content: string
  value: string
  key: string
}

const _faqData: AccordionItems[] = [
  {
    trigger: "What is Ecoseeds?",
    content:
      "Ecoseeds is a financial platform that promotes Regenerative Finance approaches to environmental fundraising. It enables the creation of custom tokens for ecological projects and facilitates crowd-funding while ensuring long-term commitment to the projects.",
    value: "item-1",
    key: "1",
  },
  {
    trigger: "How does Ecoseeds work?",
    content:
      "Ecoseeds operates through a smart contract-based launchpad. Users can participate in token sales associated with specific ecological projects. There is a lock period for the tokens, during which the project team must provide proof of work being done. Once verified, funds are released to the project team, and users receive tokens.",
    value: "item-2",
    key: "2",
  },
  {
    trigger: "Why is there a lock period for the tokens?",
    content:
      "The lock period ensures that the project team actively works on the ecological project before receiving the full funds. It enhances accountability and transparency, providing confidence to users that their investments are being used effectively.",
    value: "item-3",
    key: "3",
  },
  {
    trigger: "How can I participate in a token sale on Ecoseeds?",
    content:
      "To participate, you can visit the Ecoseeds platform and explore the ongoing token sales. Once you find a project you are interested in, you can purchase the custom tokens associated with that project.",
    value: "item-4",
    key: "4",
  },
  {
    trigger: "Can I sell or transfer my tokens during the lock period?",
    content:
      "No, the tokens are locked during the specified period and cannot be sold or transferred until the lock period expires. This ensures that the funds remain committed to the project for the intended duration.",
    value: "item-5",
    key: "5",
  },
  {
    trigger: "How does Ecoseeds ensure long-term commitment to the projects?",
    content:
      "By implementing lock periods and proof of work requirements, Ecoseeds incentivizes project teams to actively work on their initiatives. This helps ensure that the projects receive the necessary resources and support for long-term success.",
    value: "item-6",
    key: "6",
  },
  {
    trigger:
      "What happens if a project fails to provide proof of work during the lock period?",
    content:
      "If a project fails to provide sufficient proof of work, the platform may withhold the release of funds or take appropriate measures to address the situation. This helps maintain accountability and encourages project teams to fulfill their commitments.",
    value: "item-7",
    key: "7",
  },
  {
    trigger: "How does Ecoseeds prioritize user experience?",
    content:
      "Ecoseeds recognizes the importance of design and aims to create a user-friendly platform. It focuses on creating intuitive interfaces and seamless processes to ensure that users have a delightful experience while supporting ecological projects.",
    value: "item-8",
    key: "8",
  },
  {
    trigger:
      "How can I stay updated on the progress of the projects I have invested in?",
    content:
      "Ecoseeds provides regular updates and communication channels for users to stay informed about the progress of the projects they have invested in. These updates could include project reports, milestones, and other relevant information.",
    value: "item-9",
    key: "9",
  },
]

const HowtoPage = () => {
  return (
    <section className="container flex flex-col items-center space-y-4 py-8 ">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
        <span className="bg-gradient-to-r from-[#23e761] to-[#23e7c3] bg-clip-text text-transparent">
          How
        </span>{" "}
        it works?
      </h1>
      <p className="w-[700px] text-center">
        Ecoseeds is a financial platform that aims to promote Regenerative
        Finance approaches to environmental fundraising. It provides a mechanism
        for creating custom tokens that represent investments in ecological
        projects. These tokens can be obtained through crowd-funding, and the
        platform ensures long-term commitment to the supported projects.
      </p>
      <Accordion type="single" collapsible className="w-[700px]">
        {_faqData.map((item) => (
          <AccordionItem value={item.value} key={item.key}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

export default HowtoPage
