"use client"

import { getPoste } from "@/app/state/authState"
import { useSelector } from "react-redux"

export default function Layout({niveau1,niveau2,niveau3,niveau4}:{
    niveau1:React.ReactNode,
    niveau2:React.ReactNode,
    niveau3:React.ReactNode,
    niveau4:React.ReactNode,}){

        const poste = useSelector(getPoste)
    return(
        <>
            {
                poste === "Agent" ? niveau1 : poste === "DirecteurES" ? niveau2:poste === "Opérateur" ? niveau4:
                niveau3
            }
        </>
    )
}