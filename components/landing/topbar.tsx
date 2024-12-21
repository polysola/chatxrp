import React from 'react'
import Logo from "../logo"
import Link from "next/link"
import { Button } from "../ui/button"
import { Sparkle, Sparkles } from "lucide-react"

const Topbar = () => {
  return (
    <div className="border-b w-full p-4 relative z-20">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Logo/>
        
        <div>
          <Link href='./conversation'>
             <Button className="gradient-btn">
                <span className="mr-2">Get Started</span>
                <Sparkles/>
             </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Topbar