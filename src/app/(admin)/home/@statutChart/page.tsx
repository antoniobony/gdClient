"use client"
import { PieValueType } from '@mui/x-charts';
import { MakeOptional } from '@mui/x-charts/internals';
import { PieChart } from '@mui/x-charts/PieChart';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export default function  Page(){
    const [data,setData] =useState<any>([])
        
    useEffect(()=>{
        const fetch = async()=>{
            try{
                const data:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/ticket/nombreTicketStatut",{
                    headers:{
                       "Authorization":"Bearer "+Cookies.get("token"),
                        "Content-Type":"application/json" 
                    }
                })
                let DataChart:MakeOptional<PieValueType, "id">[] = []
                let i = 0    
                
                Array.from(data.data).forEach((e:any)=>{
                    DataChart.push({
                        id:i,
                        value:e.nombreTicket,
                        label:e.designation
                    })
                    i++
                })
                setData(DataChart)
            }catch(error){
                if(error instanceof AxiosError){
                    console.log(error.response?.data?.message)
                  }
                console.log(error)
            }
        
        }
        fetch()
    },[])

    const router = useRouter()

    return(
        <div className="card-body shadow-sm overflow-scroll w-500 sm:w-full rounded-lg  bg-white dark:bg-gray-800 items-center ">
            <h1 className="text-black-500  text-[15px] mt-5 ml-32  mb-3 dark:text-white">Nombre de ticket par Statut</h1>
            <PieChart
            colors={["#4caf50","#5031cc", "#4caf50"]}
            series={[
            {
            data: data
            },
            
            ]}
            onItemClick={(event,pieItem,item)=>{
                 router.push(`/tableTicket?statut=${item.label}`)
                }}
            width={500}
            height={200}
        />
        </div>
    )
}