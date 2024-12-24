"use client"

import { useDeleteAdminMutation, useDeletePersonnelMutation, useDeleteSuperAdminMutation, useGetAdminByIdQuery, useGetPersonnelByIdQuery } from "@/app/state/api"
import { clearToken, getRole } from "@/app/state/authState"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie';
import Image from "next/image"

export default function Page({params}:{params:{id:string}}){
    const [useDelete,{error:errorPersonnel,isLoading:isLoadingPersonnel}]=useDeletePersonnelMutation()
    const [useDeleteAdmin,{error:personnelError,isLoading:isLoadingAdmin}]=useDeleteAdminMutation()
    const [useDeleteSuperAdmin,{error:deleteAS}]=useDeleteSuperAdminMutation()
    
    const role = useSelector(getRole)
    
    const dispatch = useDispatch()
    const router = useRouter()

    const handleDelete =(e:any)=>{
        if(role === "PERSONNEL"){
            useDelete({personnelId:params.id})
        }else if(role === "ADMIN"){
            useDeleteAdmin({personnelId:params.id})
        }
        else{
            useDeleteSuperAdmin({personnelId:params.id})
 
        }
         
        Cookies.remove("token");
        Cookies.remove("email");
        Cookies.remove("role");
        Cookies.remove("poste");
        Cookies.remove("id");
        dispatch(clearToken())
        router.refresh()
    }

    return(
        <>
            <div className="flex flex-col space-y-5 mx-auto items-center">
                <Image className="rounded-xl" src={"/assets/delete.png"} width={400} alt="delete" height={400}/>
                <p><button className=" bg-red-500 text-white p-4 rounded-xl" onClick={handleDelete}>Supprimez</button></p>
            </div> 
        </>
    )
}