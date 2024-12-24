'use client'

import Header from "@/app/(component)/Header/Header";
import React, { SetStateAction, useEffect } from "react";
import { useState } from "react";
import { MyModal } from "@/app/(component)/Modal/Modal";
import TableView from "@/app/(component)/Table/TableView";
import Field from  "@/app/(component)/Field/Fields"
import axios from "axios";
import Selects from "@/app/(component)/Select/Select";
import SwitcherThree from "@/app/(component)/Switcher/SwitcherThree";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            align:"middle"
        },{
            id:1,
            label:"Code",
            align:"middle"
        },{ 
            id:2,
            label:"Designation",
            align:"middle"
        },
        {
            id:3,
            label:"Direction",
            align:"middle"
        },
        {
            id:4,
            label:"Departement",
            align:"middle"
        },
        {
            id:5,
            label:"Action",
            align:"middle"
        }
]

type direction={
    id:string|number,
    code:string,
    designation:string
}

interface rows {
    id: string | number;
    designation: string;
    code?:string;
    niveau:true;
    direction?:direction;  
    departement?:direction;
  }





const Poste = ({name}:Props) =>{ 

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event:any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const [poste,setPoste]= useState({designation:"",code:""})
    const [posteModif,setPosteModif]= useState({designation:"",code:""})
    const [data, setData] = useState<rows[]>([])
    const [dataNew, setDataNew] = useState<rows[]>([])
    const [departement,setDepartement] = useState<direction[]>([])
    const [direction,setDirection] = useState<direction[]>([])
    const [departementD,setDepartementD] = useState("")
    const [directionD,setDirectionD] = useState("")
    const [open,setOpen]=useState(false)
    const [enabledDirection,setEnabledDirection] = useState(false) 
    const [enableDepartement,setEnabledDepartement]= useState(false)
    const [message,setMessage]=useState("")
    const Direction= React.createRef<HTMLSelectElement>()
    const Departement= React.createRef<HTMLSelectElement>()
   
    const Change = (e: { target: { value: React.SetStateAction<string>,name:string;} })=>{
        setPoste({
            ...poste,
            [e.target.name]:e.target.value
        })
    }


    const handleSubmit=(e: { preventDefault: () => void; })=>{
        e.preventDefault(); 
        posteModif.designation ? Update():add()
    }
      
    
    const handleClose=()=>{
        setPoste({designation:"",code:""})
        setPosteModif({designation:"",code:""})
        setMessage("")
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const add = ()=>{
        const de = departement.find((d)=>d.designation === Departement.current?.value)
        const di = direction.find((d)=>d.designation === Direction.current?.value)
        axios.post(
            process.env.NEXT_PUBLIC_API_BASE_URL+"/poste",
        {
           "designation":poste.designation,
           "code":poste.code,
           "direction":di,
           "departement":de
        },{ 
            headers:{
            "Accept":"*/*",
            Authorization:"Bearer "+Cookies.get("token"),
          }}).then(
            e=>{
                handleSuccessNotification()
            }
        ).catch(er=>setMessage(er.response.data))
        }

    const Update =()=>{
        const de = departement.find((d)=>d.designation === Departement.current?.value)
        const di = direction.find((d)=>d.designation === Direction.current?.value)
        const da = data as rows[]
        const id = da.find((d => d.designation  === posteModif.designation))
        let ids = id?.id

        axios.put(
            process.env.NEXT_PUBLIC_API_BASE_URL+`/poste/${ids}`,
        {
            "designation":poste.designation ? poste.designation:posteModif.designation,
            "code":poste.code ? poste.code:posteModif.code,
            "direction":enabledDirection ? direction:null,
            "departement": enableDepartement ? departement:null
        },{ 
            headers:{
            "Accept":"*/*",
            Authorization:"Bearer "+Cookies.get("token"),
          }}).then(
            e=>{
                handleSuccessNotification()
            }
        ).catch(er=>setMessage(er.data))
        }

        const RemovePoste=(id:string)=>{
        
            axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL+`/poste/${id}`,{
              headers:{
              Authorization:"Bearer "+Cookies.get("token"),
            }}).then(   
              r=>{
                if(r.status===200){
                    handleSuccessNotification()
                }
              }).catch(er=>setMessage(er.response.data))
            }

        const Action=(e:React.MouseEvent<HTMLButtonElement>)=>{

              const target = e.target as unknown as Target    
              if(target.value === "modifier"){
                    const da = data as rows[]
                    const newData = da.find((d => d.id as string  == target.id as string))
                    setPosteModif({
                        designation:newData?.designation as string,
                        code:newData?.code as string,
                    })
                    setDepartementD(newData?.departement?.designation as string)
                    setDirectionD(newData?.direction?.designation as string)
                    setOpen(true)
              }else{
                RemovePoste(target.id)
              }
            }

    useEffect(()=>{
        const fetchData1 = ()=>{
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/direction",
                {
                    headers:{
                        Authorization:"Bearer "+Cookies.get("token")
                    }
                }).then(res => res.json())
                .then((res)=>{
                    setDirection(res)
                }).catch(e => alert(e))
        }

        const fetchData2 = ()=>{
            fetch(process.env.NEXT_PUBLIC_API_BASE_URL+"/departement",
                {
                    headers:{
                        Authorization:"Bearer "+Cookies.get("token")
                    }
                }).then(res => res.json())
                .then((res)=>{
                    setDepartement(res)
                }).catch(e => alert(e))
        }

        const fetchData = () => {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/poste`, {
                headers: {
                    Authorization: "Bearer "+Cookies.get("token")
                }
            })
            .then(res => res.json())
            .then((res) => {
                const updatedData = res.map((item: rows) => ({
                    ...item,
                    niveau: true 
                }));
                setDataNew(updatedData);
                console.log(updatedData);
            })
            .catch(e => alert(e));
        };
        fetchData2()
        fetchData()
        fetchData1()
    },[])    

    const handleSuccessNotification = (): void => {
        toast.success('Opération réussie!', {
          autoClose: 3000, // 3 secondes
        });
      };
    
      const handleErrorNotification = (): void => {
        toast.error('Une erreur est survenue!', {
          autoClose: 5000, // 5 secondes
        });
      };
    
    return(
        <div className="h-[540px] w-full px-4 pb-8 xl:px-6 ">
            <div className="pt-5">
                <Header name={name} button={    
                    <MyModal isOpen={open} handleOpen={handleOpen} onClose={handleClose} name={name} >
                    <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                        <Field type="text" placeholder="designation" name="designation" className="w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary
                         dark:text-white dark:focus:outline-none" onChange={Change} defaultValue={posteModif.designation?posteModif.designation:""}/> 
                        <Field type="text" placeholder="code" name="code" className="w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary
                         dark:text-white dark:focus:outline-none" onChange={Change} defaultValue={posteModif.code?posteModif.code:""}/> 
                        <SwitcherThree label="direction" change={()=>{setEnabledDirection(!enabledDirection);enabledDirection==false && setEnabledDepartement(false)}} enable={enabledDirection}/>
                        {enabledDirection && <Selects data={direction.map((d)=>d.designation) as unknown as string[]} name="direction" className="w-full rounded py-2 px-2 outline" ref={Direction} defaultValue={posteModif?directionD:""} />}
                        <SwitcherThree label="departement" change={()=>{setEnabledDepartement(!enableDepartement);enableDepartement==false && setEnabledDirection(false)}} enable={enableDepartement}/>
                        {enableDepartement && <Selects data={departement.map((d=>d.designation)) as unknown as string[]} name="departement" className="w-full rounded py-2 px-2 outline" ref={Departement} defaultValue={posteModif?departementD:""} />}                 
                        <button type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                            bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
                            focus:ring-blue-600 focus-offset-2 
                            `}>
                               {posteModif.code ? "Modifier":"Ajouter"}
                            </button>
                            {message}
                    </form>
                </MyModal>}
                 isSmallText/>
                 <ToastContainer/>
            </div>
            <TableView  onClick={Action} dataHeader={dataHeader} dataBody={dataNew}/>          
             
        </div>
        
    )
}


export default Poste;