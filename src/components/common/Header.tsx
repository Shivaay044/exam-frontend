"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'





function Header() {

    const path = [
        {id:"login",title:"Login", link:"/"},
        {id:"signUp",title:"SignUp", link:"/signup"},
        // {id:"add-exam",title:"Add Exam", link:"/add-exam"},
        {id:"exam",title:"Exam", link:"/exam/:id"},
    ]

    const pathname = usePathname()
    const [route,setRoute ] = useState(path)


    
    
   useEffect(()=>{
    const userRole =  localStorage.getItem("Role") ?? null;
       if(userRole == "admin"){
        console.log("helloooo")
        setRoute([...route,{id:"add-exam",title:"Add Exam", link:"/add-exam"}])
       }
    console.log(userRole,"userRole")
   },[pathname])


  return (
    <div className='flex gap-6 p-4 relative'>
      {
        route.map((item)=>(
            <Link key={item.id} href={item.link}>{item.title}</Link>
        ))
      }
      {
        localStorage.getItem("Token") && <button className='absolute end-4 top-2 bg-blue-500 rounded-xl px-4 py-2' onClick={()=>{localStorage.clear(); window.location.href="/"}}>Logout</button>
      }
    </div>
  )
}

export default Header
