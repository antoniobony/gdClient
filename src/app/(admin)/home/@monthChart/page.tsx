"use client"
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default  function Page(){
    const [data,setData] = useState([])
    
    const router = useRouter()

    useEffect(()=>{
        const fetch = async()=>{
            try{
                const data:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/ticket/nombreTicketMonth",{
                    headers:{
                        "Authorization":"Bearer "+Cookies.get("token"),
                         "Content-Type":"application/json" 
                     }
                })
                setData(data.data)
            }catch(error){
                console.log(error)   
            }
        
        }
        fetch()
    },[])
    return(
        <div style={{ width: '100%' }} className="card-body overflow-scroll w-500 sm:w-full bg-white shadow-sm rounded-lg dark:bg-gray-800">   
            <BarChart
            colors={["#c43e46"]}
            dataset={data}
            xAxis={[
            { scaleType: 'band', dataKey: 'designation'},
            ]}
            onAxisClick={(event,data) => {
                router.push("/tableTicket?mois="+data?.axisValue)
              }}
          {...chartSetting}
        />
        </div>
    )
}

const chartSetting = {
    yAxis: [
      {
        label: '',
      },
    ],
    series: [{ dataKey: 'nombreTicket', label: 'Pourcentage de ticket traité par mois' }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
      },
    },
  };
  

  function valueFormatter(value: number | null) {
    return `${value}%`;
  }  