import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import { getId, getPoste, getRole } from "@/app/state/authState";
import { AlignRightIcon, ChevronDown, ChevronUp, Computer, Earth, HandshakeIcon, Home, Hotel, Icon, ImageDown, LucideGitGraph, LucideIcon, MapIcon, MapPin, ServerIcon, Ticket, User, User2Icon, WorkflowIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = ()=>{
const [showProject,setShowProject]=useState(true)
const [showPriority,setShowPriority]=useState(true)

const dispatch = useAppDispatch()
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed 
    );

const role = useSelector(getRole)
const id = useSelector(getId)
const poste = useSelector(getPoste)
return (
    <div className={`fixed flex flex-col justify-between shadow-xl transition-all duration-1000 ease-in-out h-full z-40 dark:bg-black overflow-y-auto bg-white
    ${isSidebarCollapsed ? "w-0 hidden":"w-64"} `}>
        <div className="flex h-[100%] w-full flex-col justify-start dark:bg-zinc-950">
            <div  className="z-50 flex min-h-[56px] w-64 items-center justify-between  bg-white px-6 pt-3 dark:bg-zinc-950">
                <div className="text-xl font-bold text-gray-800 space-x-2 dark:text-white flex flex-row">
                <Image className="rounded-full" src="/assets/logo.png" alt="a" width={35}   height={35}/>
                  <h1 className="text-blue-primary">SHS App</h1>
                </div>
                {
                    isSidebarCollapsed ? null:(
                        <button className="py-3"
                        onClick={()=>{
                            dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
                        }}
                        >
                            <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white"/>
                        </button>            
                    )
                }
            </div>
            <nav className="z-10 w-full">
                {
                    role ==="PERSONNEL" &&(
                        <>
                            <SidebarLink icon={Ticket} href={`/ticket/${id}/${poste ==="Agent" ?"niveau1" : poste === "DirecteurES" ? "niveau2": 
                                poste ==="Opérateur"? "niveau4":"niveau3"} `} label="Ticket"/>
                            <SidebarLink icon={ImageDown} href={`/attachement/${id}`} label="Attachement"/>
                            <SidebarLink icon={User} href={`/profile/${id}`} label="Profil"/> 
                        </>
                    )
                }
                {
                    role !=="PERSONNEL" &&(
                        <>
                            <SidebarLink icon={Home} href="/home" label="Table de bord"/>
                            <SidebarLink icon={User} href={`/profile/${id}`} label="Profil"/> 
                        </>
                    )
                }
            </nav> 
            {
                role !== "PERSONNEL" &&(
                    <>
                         <button onClick={()=>setShowProject((prev)=>!prev)} className="flex w-full items-center 
                        justify-between px-8 py-3 text-gray-500 transition-all duration-1000s">
                            <span className="">Donnée</span>
                            {
                            showProject ?(
                            <ChevronUp className="h-5 w-5"/>
                            ) :
                            <ChevronDown className="h-5 w-5"/>
                            }
                        </button>
                    </>
                )
            }
           
            {
                showProject && role !=="PERSONNEL" &&(
                    <>
                        <SidebarLink icon={MapPin} href="/commune" label="Commune"/>
                        <SidebarLink icon={MapPin} href="/quartier" label="Quartier"/>
                        <SidebarLink icon={Hotel} href="/direction" label="Direction"/>
                        <SidebarLink icon={Hotel} href="/departement" label="Departement"/>
                        <SidebarLink icon={Computer} href="/poste" label="Poste"/>
                        <SidebarLink icon={WorkflowIcon} href="/secteur" label="Secteur"/>
                        <SidebarLink icon={HandshakeIcon} href="/service" label="Service"/>
                        <SidebarLink icon={Earth} href="/environnement" label="Environnement"/>
                        <SidebarLink icon={AlignRightIcon} href="/environnement/categorie" label="Categorie"/>
                        <SidebarLink icon={User2Icon} href="/utilisateur" label="Utilisateur"/>
                    </>
                )
            }

        </div>   
    </div> 
    )
}


interface SidebarLinkProps{
    href:string,
    icon:LucideIcon,
    label:string,
    //isCollapsed:boolean
}

const SidebarLink = ({
    href,
    icon:Icon,
    label,
   // isCollapsed
}:SidebarLinkProps)=>{
    const id = useSelector(getId)
    const pathname = usePathname();
    const isActive = pathname === href || (href === "/profile/"+id && pathname === "/profile/"+id+"/changerMotDePasse")||(href === "/profile/"+id && pathname === "/profile/"+id+"/modifier" )
    ||(href === "/profile/"+id && pathname === "/profile/"+id+"/supprimerCompte" )||(href === "/attachement/"+id && pathname.startsWith("/attachement"));
    const screenWidth = window.innerWidth;

    

    return(
        <Link  href={href} className="w-full">
            <div className={`relative flex cursor-pointer items-center gap-3 transition-colors
                hover:bg-gray-100 dark:bg-zinc-950 dark:hover:bg-gray-800 ${
                    isActive ? "bg-gray-100 text-white dark:bg-gray-700":""
                }
                justify-start px-8 py-3`}>
                    {
                        isActive && (
                            <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200"/>            
                        )
                    }
                    <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100"/>
                    <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                        {label}
                    </span>
                </div>
        </Link>
    )

}

export default Sidebar;

//6NWWJ-YQWMR-QKGCB-6TMB3-9D9HK