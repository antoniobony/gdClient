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
                const dataDepartement:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/ticket/nombreTicketDepartement",{
                    headers:{
                       "Authorization":"Bearer "+Cookies.get("token"),
                        "Content-Type":"application/json" 
                    }
                })
                const dataDirection:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/ticket/nombreTicketDirection",{
                    headers:{
                       "Authorization":"Bearer "+Cookies.get("token"),
                        "Content-Type":"application/json" 
                    }
                })

                const data =dataDirection.data.concat(dataDepartement.data) 
                let DataChart:MakeOptional<PieValueType, "id">[] = []
                let i = 0    
                
                Array.from(data).forEach((e:any)=>{
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
        <div className="card-body shadow-sm rounded-lg overflow-scroll w-500 sm:w-full bg-white dark:bg-gray-800 items-center ">
            <h1 className="text-black-500  text-[15px] mt-5 ml-32 mb-14 dark:text-white">Nombre de ticket par département ou direction</h1>
            <PieChart
            series={[
            {
            data: data
            },
            
            ]}
            onItemClick={(event,pieItem,item)=>{
                const d = "Direction"
                if((item.label as string).includes(d)){
                    router.push(`/tableTicket?direction=${item.label}`)
                }else{
                router.push(`/tableTicket?departement=${item.label}`)
                }
                }}
            width={500}
            height={200}
        />
        </div>
    )
}