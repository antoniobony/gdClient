"use client"

import React, { useEffect } from "react";
import Navbar from "@/app/(component)/Navbar/Navbar";
import Sidebar from "./(component)/Sidebar/Sidebar"; 
import StoreProvider, { useAppSelector } from "./redux";

 function DashboardLayout({children}:{children:React.ReactNode}) {
    const isSidebarCollapsed = useAppSelector((state)=> state.global.isSidebarCollapsed)
    const isDarkMode = useAppSelector((state)=> state.global.isDarkMode)

    useEffect(
        ()=>{
            if(isDarkMode){
                document.documentElement.classList.add("dark")
            }
            else{
                document.documentElement.classList.remove("dark")
            }
        }
    )
    return (
      <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
        <Sidebar/> 
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${isSidebarCollapsed ? "" :"md:pl-64"} `}>
            <Navbar isDarkMode={isDarkMode} isSidebarCollapsed={isSidebarCollapsed}/>
          {children}
        </main>
      </div>
    )
  }


const DashboardWrapper =({children}:{children:React.ReactNode})=>{
    return(
            <DashboardLayout>
                {children}
            </DashboardLayout>
    )
    
}

export default DashboardWrapper;