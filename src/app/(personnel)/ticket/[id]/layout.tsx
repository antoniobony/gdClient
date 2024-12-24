"use client"

import DashboardWrapper from "@/app/dashboardWrapper"
import { getPoste, getToken } from "@/app/state/authState"
import { useSelector } from "react-redux"

export default function Layout({children}:{
    children:React.ReactNode,
}){
    return(
        <>
            <DashboardWrapper>
            {
                children
            }
            </DashboardWrapper> 
        </>
    )
}