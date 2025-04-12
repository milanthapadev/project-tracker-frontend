"use client"

import Link from "next/link"
import { ClipboardList } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container max-w-7xl mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-purple-600 text-white">
            <ClipboardList className="h-5 w-5" />
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Project Tracker</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
