'use client'

import { useAppSelector } from "@/app/redux";
import Header from "@/app/(component)/Header/Header";
import React, { useEffect } from "react";
import { useState } from "react";
import { MyModal } from "@/app/(component)/Modal/Modal";
import TableView from "@/app/(component)/Table/TableView";
import Field from  "@/app/(component)/Field/Fields"
import axios from "axios";
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
        }
        ,{
            id:3,
            label:"Action",
            align:"middle"
        }
]

interface rows {
    id: string | number;
    designation: string; 
    code?:string
  }




const Secteurs = ({name}:Props) =>{ 

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event:any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const [secteurModif,setSecteurModif]= useState({designation:"",code:""})
    const [secteur,setSecteur]= useState({designation:"",code:""})
    const [data, setData] = useState([]);
    const [open,setOpen]=useState(false)
    
    const inputStyles = "w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary dark:text-white dark:focus:outline-none";
   
    const Change = (e: { target: { value: React.SetStateAction<string>,name:string;} })=>{
        setSecteur({
            ...secteur,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        secteurModif ? Update():addDate()
        handleClose()
        
    }
      
    
    const handleClose=()=>{
        setSecteurModif({designation:"",code:""})
        setSecteur({designation:"",code:""})
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const addDate = ()=>{
        axios.post(
            process.env.NEXT_PUBLIC_API_BASE_URL+"/secteur",
        {
           "designation":secteur.designation,
           "code":secteur.code
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
        const id = da.find((d => d.designation  === secteurModif.designation))
        let ids = id?.id
        axios.put(
            process.env.NEXT_PUBLIC_API_BASE_URL+`/secteur/${ids}`,
        {
            "designation":secteur.designation ?secteur.designation:secteurModif.designation,
            "code":secteur.code ? secteur.code:secteurModif.code
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

        const RemoveSecteur=(id:string)=>{
        
            axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL+`/secteur/${id}`,{
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
                    setSecteurModif({
                        designation:newData?.designation as string,
                        code:newData?.code as string
                    })
                    setOpen(true)
              }else{
                RemoveSecteur(target.id)
              }
            }

    useEffect(()=>{
        const fetchData = ()=>{
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/secteur",
                {
                    headers:{
                        Authorization:"Bearer "+Cookies.get("token")
                    }
                }).then(res => res.json())
                .then((res)=>{
                    setData(res)
                }).catch(e => alert(e))
        }
        fetchData()

    },[])    

    return(
        <div className="h-[540px] w-full px-4 pb-8 xl:px-6 ">
            <div className="pt-5">
                <Header name={name} button={    
                    <MyModal isOpen={open} handleOpen={handleOpen} onClose={handleClose} name={name} >
                    <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                        <Field type="text" name="designation" className={inputStyles} onChange={Change} defaultValue={secteurModif.designation?secteurModif.designation:""}/> 
                        <Field type="text" name="code" className={inputStyles} onChange={Change} defaultValue={secteurModif.code?secteurModif.code:""}/> 
                        <button type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                            bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
                            focus:ring-blue-600 focus-offset-2 
                            `}>
                               {secteurModif.code ? "Modifier":"Ajouter"}
                            </button>
                    </form>
                </MyModal>}
                 isSmallText/>
            </div>
            <TableView  onClick={Action} dataHeader={dataHeader} dataBody={data}/>
                        
        </div>
        
    )
}


export default Secteurs;