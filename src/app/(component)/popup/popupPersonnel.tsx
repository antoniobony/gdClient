
import { poste, ticket } from "@/app/state/api"
import { ActivityIcon, Computer } from "lucide-react"
import { useState } from "react"


export default function PopupPersonnel({onClick,children}:{onClick:(posteID:string)=>void,children:React.ReactNode}){
    const[open,setOpen]= useState(false)
    const posteData:poste[]=[
      {
        id: "3",
        code: "AGT",
        designation: "Agent",
        createdAt: "2024-11-05",
 
      },
    {
        id: "4",
        code: "DES",
        designation: "DirecteurES",
        createdAt: "2024-11-05",
 
    },
    {
        id: "5",
        code: "OPR",
        designation: "Opérateur",
        createdAt: "2024-11-07",
 
    },
    {
        id: "7",
        code: "DRJ",
        designation: "Directeur juridique",
        createdAt: "2024-11-10",
 
    },
    {
        id: "8",
        code: "CDS",
        designation: "Chef de Département Social",
        createdAt: "2024-11-10",
 
      }
    ]
    return(
                <>
                  <button onClick={()=> setOpen(!open)} className=" h-6 w-5 items-center justify-center dark:text-neutral-500">
                    {children}
                    </button>
                  <div className={`${open? "scale-105":"scale-x-90 hidden"} dark:bg-dark-secondary transition-all  duration-1000 absolute bg-white mr-28 mt-20  shadow-md  rounded-t-lg`}>
                    <h1 className="font-bold text-sm  p-4">Choisissez votre poste de travail</h1>
                    <ul className="divide-y">
                        {
                            posteData.map(d=>(
                                <li className="py-1 px-2 dark:hover:bg-dark-tertiary hover:bg-gray-200 hover:rounded-t-md " key={d.id}><button className="w-full space-x-4 flex flex-row" onClick={()=>{onClick(d.id);setOpen(false)}}><Computer size={20}/><h1>{d.designation}</h1></button></li>
                            ))
                        }
                    </ul>
                    <div className="h-5 rounded-b-lg"/>
                  </div>             
      </>
    )
  }