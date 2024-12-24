"use client"
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const chartSetting = {
    xAxis: [
      {
        label: 'Nombre de ticket',
      },
    ],
    width: 500,
    height: 400,
 };


  export default function Page(){
    const [data,setData] = React.useState([])
    
    const router = useRouter()

    React.useEffect(()=>{
        const fetch = async()=>{
            try{
                const data:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/ticket/nombreTicketCategorie",{
                    headers:{
                       "Authorization":"Bearer "+Cookies.get("token"),
                        "Content-Type":"application/json" 
                    }
                })
                setData(data.data)
            }catch(error){
                if(error instanceof AxiosError){
                    console.log(error.response?.data?.message)
                  }
                console.log(error)
            }
        
        }
        fetch()
    },[])
    return(

             <div className="card-body shadow-sm rounded-lg overflow-scroll w-500 sm:w-full  bg-white dark:bg-gray-800 items-center">
            <BarChart
            dataset={data}
            yAxis={[{ scaleType: 'band', dataKey: 'categorie_ticket' }]}
            series={[{ dataKey: 'nombre_ticket', label: 'Nombre ticket par categorie'}]}
            layout="horizontal"
            onAxisClick={(event,data) => {
                router.push("/tableTicket?categorie du ticket="+data?.axisValue)
              }}
            {...chartSetting}
            margin={{ left: 60 }} 
            />
        </div>
            )
}
