import React from "react"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="container flex flex-col items-center justify-center py-12">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}
