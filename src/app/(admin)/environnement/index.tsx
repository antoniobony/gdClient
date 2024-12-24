'use client'

import { useAppSelector } from "@/app/redux";
import Header from "@/app/(component)/Header/Header";
import React, { useEffect } from "react";
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
    align: 'left' | 'right' | 'middle'; 
}  

const dataHeader:Column[]=[
        {
            id:0,
            label:"id",
            align:"left"
        },
        {
            id:1,
            label:"Code",
            align:"left"
        },
        {
            id:2,
            label:"Designation",
            align:"left"
        },{
            id:3,
            label:"Categorie",
            align:"left"
        },
        {
            id:4,
            label:"Action",
            align:"middle"
        }
]

interface rows {
    id: string | number;
    designation: string; 
    code?:string;
    categorie:{
        id:string,
        designation:string
      }
  }




const Environnements = ({name}:Props) =>{ 

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event:any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const [environnementModif,setEnvironnementModif]= useState({designation:"",code:""})
    const [environnement,setEnvironnement]= useState({designation:"",code:""})
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [designationc,setDesignationc]=useState([])
    const [destinationCa,setDesignationCa] = useState("")
    const [open,setOpen]=useState(false)
    const categorie = React.createRef<HTMLSelectElement>()
    const inputStyles = "w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary dark:text-white dark:focus:outline-none";
   
    const Change = (e: { target: { value: React.SetStateAction<string>,name:string;} })=>{
        setEnvironnement({
            ...environnement,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        environnementModif ? Update():addDate()
        handleClose()
        
    }
      
    
    const handleClose=()=>{
        setEnvironnementModif({designation:"",code:""})
        setEnvironnement({designation:"",code:""})
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const addDate = ()=>{
        let c = data1 as rows[]
        const ca= c.find((d)=>d.designation === categorie.current?.value)
        axios.post(
            process.env.NEXT_PUBLIC_API_BASE_URL+"/environnement",
        {
           "designation":environnement.designation,
           "code":environnement.code,
           "categorie":ca
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
        const id = da.find((d => d.designation  === environnementModif.designation))
        let ids = id?.id
        let c = data1 as rows[]
        const ca= c.find((d)=>d.designation === categorie.current?.value)
        axios.put(
            process.env.NEXT_PUBLIC_API_BASE_URL+`/environnement/${ids}`,
        {
            "designation":environnement.designation ?environnement.designation:environnementModif.designation,
            "code":environnement.code ? environnement.code:environnementModif.code,
            "categorie":ca
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

        const RemoveEnvironnement=(id:string)=>{
        
            axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL+`/environnement/${id}`,{
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
                    setEnvironnementModif({
                        designation:newData?.designation as string,
                        code:newData?.code as string
                    })
                    setDesignationCa(newData?.categorie?.designation as string)
                    setOpen(true)
              }else{
                RemoveEnvironnement(target.id)
              }
            }

    useEffect(()=>{
        const fetchData = ()=>{
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/environnement",
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
        const fetchData1 = ()=>{
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/categorie",
                {
                    headers:{
                        Authorization:"Bearer "+Cookies.get("token")
                    }
                }).then(res => res.json())
                .then((res)=>{
                    const e = res as rows[]
                    setData1(res)
                    setDesignationc(e.map((ed)=>ed.designation) as any)
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
                        <Field type="text" name="designation" className={inputStyles} onChange={Change} defaultValue={environnementModif.designation?environnementModif.designation:""}/> 
                        <Field type="text" name="code" className={inputStyles} onChange={Change} defaultValue={environnementModif.code?environnementModif.code:""}/> 
                        <Selects data={designationc} name="categorie" className="w-full rounded py-2 px-2 outline" ref={categorie}  defaultValue={environnementModif.code?destinationCa:""}/>
                        <button type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                            bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
                            focus:ring-blue-600 focus-offset-2 
                            `}>
                               {environnementModif.code ? "Modifier":"Ajouter"}
                            </button>
                    </form>
                </MyModal>}
                 isSmallText/>
            </div>
            <TableView  onClick={Action} dataHeader={dataHeader} dataBody={data}/>
                        
        </div>
        
    )
}


export default Environnements;