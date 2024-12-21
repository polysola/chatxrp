import Footer from "@/components/landing/footer"
import Topbar from "@/components/landing/topbar"
import React from 'react'
//cần cho props children vào thì nó mới vào page.js
const LandingLayoutPage = (props:{
    children:React.ReactNode
}) => {
  return (
    
    <div className="min-h-screen">
      <Topbar/>

     <main className="max-w-5xl mx-auto">
     {props.children}
     </main>

      {/* <Footer/> */}
      </div>
  )
}

export default LandingLayoutPage