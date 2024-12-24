"use client"
import { getDarkMode } from "@/app/state";
import { useGetAdminByIdQuery, useGetPersonnelByIdQuery, useGetSuperAdminByIdQuery } from "@/app/state/api";
import { getRole } from "@/app/state/authState";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";


export default function Page({children,params}:{params:{id:string},children:React.ReactNode}){
    const role = useSelector(getRole)
    const {data:data,error:userError,isLoading:isLoadingUser} = role ==="PERSONNEL"?useGetPersonnelByIdQuery({personnelId:params.id}):
    role ==="ADMIN" ? useGetAdminByIdQuery({plaignantId:params.id}) : useGetSuperAdminByIdQuery({plaignantId:params.id})


    const router = useRouter()
    
    const darkMode = useSelector(getDarkMode)
return(
    <>
        <div className="flex flex-col space-y-10" >
            <div className="flex flex-row  p-4 justify-start space-x-10 dark:bg-zinc-900 rounded-md w-[328px] sm:w-full  shadow-md bg-white">
                <Image className="rounded-full" src="/assets/avatar/man.png" alt="a" width={50}   height={50}/>
                <div>
                    <h1 className="font-bold dark:text-white">{data?.nom+" "+data?.prenom}</h1>
                    <h2 className="text-gray-500">{role}</h2>
                    <h2 className="text-gray-500">{data?.adresse}</h2>
                </div>
            </div>
            <div className="shadow-md bg-white dark:bg-zinc-900 p-6 rounded-md min-w-min">
                <div className="flex flex-row justify-between ">
                    <h1 className="font-extrabold dark:text-white text-lg ">Information personnel</h1>
                    <button className=" border-opacity-10 border scale-105 rounded-md flex flex-row min-w-min dark:border-0 dark:bg-gray-800 justify-arround space-x-4 p-2" onClick={()=>router.push(`/profile/${params.id}/modifier`)}><Edit2 size={13} stroke={`${darkMode ? "white" :"black"} `}/><h1 className="font-semibold dark:text-white">Modifier</h1></button>
                </div>
                <div className="flex flex-row justify-start space-x-5 sm:space-x-10 lg:space-x-40 ">
                    <div>
                        <h1 className="py-2 font-bold text-black-600 dark:text-gray-300">Nom</h1>
                        <h1 className="py-2 font-bold text-gray-500">{data?.nom}</h1>

                        <h1 className="py-2 font-bold text-black-600 dark:text-gray-300">Email</h1>
                        <h1 className="py-2 font-bold text-gray-500">{data?.email}</h1>

                        <h1 className="py-2 font-bold text-black-600 dark:text-gray-300">Cin</h1>
                        <h1 className="py-2 font-bold text-gray-500">{data?.cin}</h1>

                        <h1 className="py-2 font-bold text-black-600 dark:text-gray-300">Date de naissance</h1>
                        <h1 className="py-2 font-bold text-gray-500">{data?.dateNaissance}</h1>
                    </div>
                    <div>
                        <h1 className="py-2 font-bold text-black-600 dark:text-gray-300">Prenom</h1>
                        <h1 className="py-2 font-bold text-gray-500">{data?.prenom}</h1>

                        <h1 className="py-2 font-bold text-black-600 dark:text-gray-300">Téléphone</h1>
                        <h1 className="py-2 font-bold text-gray-500">{data?.phone}</h1>

                        <h1 className="py-2 font-bold text-black-600 dark:text-gray-300">Adresse</h1>
                        <h1 className="py-2 font-bold text-gray-500">{data?.adresse}</h1>
                    </div>
                </div>
            </div>
        </div>
        {children}
    </>
)
}