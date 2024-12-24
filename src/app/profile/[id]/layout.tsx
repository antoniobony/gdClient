"use client"

import Header from "@/app/(component)/Header/Header";
import DashboardWrapper from "@/app/dashboardWrapper";
import { Edit2, Edit2Icon, Key, KeyIcon, LockIcon, LucideIcon, Settings2, Trash, Trash2, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({children,params}:{children:React.ReactNode,params:{id:string}}){
    
    return(
            <>
                <DashboardWrapper>
                <div className="p-4">
                <div className="h-[800px] w-[428px] sm:w-full px-4 pb-8 xl:px-6 card rounded-xl ">
                        <div className="pt-5">
                            <Header name="Profile" isSmallText/>
                        </div>
                        <div className="flex flex-row space-x-3 sm:space-x-16">
                            <div className="flex flex-col">
                                <nav>
                                    <SidebarLink icon={User} href={`/profile/${params.id}`} label="Profile"/>
                                    <SidebarLink  icon={Edit2Icon} href={`/profile/${params.id}/modifier`} label="Modifier profile"/>
                                    <SidebarLink icon={LockIcon} href={`/profile/${params.id}/changerMotDePasse`} label="Changer le mot de passez"/>
                                    <SidebarLink icon={Trash} href={`/profile/${params.id}/supprimerCompte`} label="Supprimez mon compte"/>
                                </nav>
                            </div>
                            <div className="flex flex-col w-full">
                            {children}
                            </div>
                        </div>
                    </div>
                </div>      
                </DashboardWrapper>
            </>
    )
}



interface SidebarLinkProps{
    href:string,
    label:string,
    icon:LucideIcon,
}

const SidebarLink = ({
    href,
    label,
    icon:Icon
}:SidebarLinkProps)=>{
    const pathname = usePathname();
    const isActive = pathname === href;    

    return(
        <Link  href={href} className="w-full">
            <div className={`relative flex cursor-pointer items-center gap-3 transition-colors rounded-md
                hover:bg-gray-100  dark:hover:bg-gray-800 ${
                    isActive ?  "bg-blue-300 bg-opacity-20  dark:bg-zinc-900":""
                }
                justify-start px-4 py-3 w-full ` }>
                    <Icon className={` h-6 w-6 text-gray-800 dark:text-gray-100`}  size={15} stroke={`${isActive  ? "blue":"gray"}`}/>
                    
                    <span className={` hidden sm:flex font-medium ${isActive  ? "text-blue-700":""}  text-gray-500 dark:text-gray-100 `}>
                        {label}
                    </span>
                </div>
        </Link>
    )

}