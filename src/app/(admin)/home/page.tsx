import Image from "next/image";
import CardStat from "../../(component)/Card/CardStat";
import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";


async function getPersonnelCount(){
    try{
        const data = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/personnel/count",{
            headers:{
                "Authorization":"Bearer "+cookies().get("token")?.value,
                "Content-Type":"application/json"
            }
        })
        return data
    }catch(error){
        if(error instanceof AxiosError){
            console.log(error.response?.data?.message)
          }
        console.log(error)
    }

    return null
}

async function getPlaignantCount(){
    try{
        const data:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/ticket/nombreTicketCin",{
            headers:{
                "Authorization":"Bearer "+cookies().get("token")?.value,
                "Content-Type":"application/json"
            }
        })
        return data
    }catch(error){
        if(error instanceof AxiosError){
            console.log(error.response?.data?.message)
          }
        console.log(error)
    }   
    return null
}

async function getTicketCount(){
    try{
        const data:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/ticket/count",{
            headers:{
                "Authorization":"Bearer "+cookies().get("token")?.value,
                "Content-Type":"application/json"
            }
        })
        return data
    }catch(error){
        if(error instanceof AxiosError){
            console.log(error.response?.data?.message)
          }
        console.log(error)
    }   
    return null
}


export default async  function Page({children}:{children:React.ReactNode}){
    const personnelData = getPersonnelCount()
    const  plaignant = getPlaignantCount()
    const ticketCountData = getTicketCount()
    const [personnelCount,plaignantData,ticketCount] = await Promise.all([personnelData,plaignant,ticketCountData])
    return(
    <>
        <CardStat label="Personnel" nombre={personnelCount?.data} image={
            <Image src="/assets/avatar/man.png" alt="a" width={70}   height={70}/>
        }/>
        <CardStat label="Plaignant" nombre={plaignantData?.data.length} image={
            <Image src="/assets/user.png" alt="a" width={70} height={70}/>
        }/>
        <CardStat label="Ticket" nombre={ticketCount?.data} image={
            <Image src="/assets/ticket.png" alt="a" width={50} height={70}/>
        }/>
        {children}
    </>
    )
}