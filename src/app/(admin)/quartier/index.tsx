'use client'

import Header from "@/app/(component)/Header/Header";
import React, { SetStateAction, useEffect } from "react";
import { useState } from "react";
import { MyModal } from "@/app/(component)/Modal/Modal";
import TableView from "@/app/(component)/Table/TableView";
import Field from  "@/app/(component)/Field/Fields"
import axios from "axios";
import Selects from "@/app/(component)/Select/Select";
import Cookies from "js-cookie";

interface Props {
    name:string
}
interface Target{
    id: string;
  value: string;
}

interface Column {
    id: string | number;
    label: string;
    align?: 'left' | 'right' | 'middle'; 
}  
const dataHeader:Column[]=[
        {
            id:0,
            label:"id",
            align:"left"
        },{
            id:1,
            label:"Designation",
            align:"left"
        },{ 
            id:2,
            label:"Commune",
            align:"middle"
        },{
            id:3,
            label:"Action",
            align:"middle"
        }
]

interface rows {
    id: string | number;
    designation: string;
    code?:string;
    commune?:{
        id:string|number,
        designation:string
      }; 
  }





const Quartier = ({name}:Props) =>{ 

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event:any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const [designationModif,setDesignationModif]= useState("")
    const [designation,setDesignation]= useState("")
    const [data, setData] = useState([])
    const [data1,setData1] = useState([])
    const [destinationC,setDesignationC] = useState([])
    const [destinationCo,setDesignationCo] = useState("")
    const [open,setOpen]=useState(false)
    const Commune= React.createRef<HTMLSelectElement>()
    
   
    const Change = (e: { target: { value: React.SetStateAction<string>;} })=>{
        setDesignation(e.target.value)
    }

    const handleSubmit=(e: { preventDefault: () => void; })=>{
        e.preventDefault(); 
        designationModif ? Update():add()
        handleClose()
    }
      
    
    const handleClose=()=>{
        setDesignationModif("")
        setDesignation("")
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const add = ()=>{
        let commune = data1 as rows[]
        const co = commune.find((d)=>d.designation === Commune.current?.value)
        axios.post(
            process.env.NEXT_PUBLIC_API_BASE_URL+"/quartier",
        {
           "designation":designation,
            "commune":co 
        },{ 
            headers:{
            "Accept":"*/*",
            Authorization:"Bearer "+Cookies.get("token"),
          }}).then(
            e=>{
                alert(e)
            }
        ).catch(er=>console.log(er))
        }

    const Update =()=>{
        const da = data as rows[]
        const id = da.find((d => d.designation  === designationModif))
        let ids = id?.id
        axios.put(
            process.env.NEXT_PUBLIC_API_BASE_URL+`/quartier/${ids}`,
        {
            "designation":designation ?designation:designationModif
        
        },{ 
            headers:{
            "Accept":"*/*",
            Authorization:"Bearer "+Cookies.get("token"),
          }}).then(
            e=>{
                alert(e)
            }
        ).catch(er=>console.log(er))
        }

        const RemoveQuartier=(id:string)=>{
        
            axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL+`/quartier/${id}`,{
              headers:{
              Authorization:"Bearer "+Cookies.get("token"),
            }}).then(   
              r=>{
                if(r.status===200)console.log(r.data)
              }).catch(er=>console.log(er))
            }

        const Action=(e:React.MouseEvent<HTMLButtonElement>)=>{

              const target = e.target as unknown as Target    
              if(target.value === "modifier"){
                    const da = data as rows[]
                    const newData = da.find((d => d.id as string  == target.id as string))
                    setDesignationModif(newData?.designation as string)
                    setDesignationCo(newData?.commune?.designation as string)
                    setOpen(true)
              }else{
                RemoveQuartier(target.id)
              }
            }

    useEffect(()=>{
        const fetchData1 = ()=>{
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/commune",
                {
                    headers:{
                        Authorization:"Bearer "+Cookies.get("token")
                    }
                }).then(res => res.json())
                .then((res)=>{
                    let e = res as rows[]
                    setDesignationC(e.map((ed)=>ed.designation) as any)
                    setData1(res)
                }).catch(e => alert(e))
        }
        const fetchData = ()=>{
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/quartier",
                {
                    headers:{
                        Authorization:"Bearer "+Cookies.get("token")
                    }
                }).then(res => res.json())
                .then((res)=>{
                    
                    setData(res)
                    console.log(res)
                }).catch(e => alert(e))
        }
        fetchData()
        fetchData1()
    },[])    

    return(
        <div className="h-[540px] w-full px-4 pb-8 xl:px-6 ">
            <div className="pt-5">
                <Header name={name} button={    
                    <MyModal isOpen={open} handleOpen={handleOpen} onClose={handleClose} name={name} >
                    <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                        <Field type="text" name="designation" className="w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary dark:text-white dark:focus:outline-none" onChange={Change} defaultValue={designationModif?designationModif:""}/> 
                        <Selects data={destinationC} name="commune" className="w-full rounded py-2 px-2 outline" ref={Commune} defaultValue={designationModif?destinationCo:""} />                 
                        <button type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                            bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
                            focus:ring-blue-600 focus-offset-2 
                            `}>
                               {designationModif ? "Modifier":"Ajouter"}
                            </button>
                    </form>
                </MyModal>}
                 isSmallText/>
            </div>
        
            <TableView  onClick={Action} dataHeader={dataHeader} dataBody={data}/>
                        
        </div>
        
    )
}


export default Quartier;