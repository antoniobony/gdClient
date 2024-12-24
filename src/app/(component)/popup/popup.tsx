
import { ticket } from "@/app/state/api"
import { ActivityIcon } from "lucide-react"
import { useState } from "react"


export default function Popup({onClick,data,ticket}:{ticket:ticket,onClick:(id:string)=>void,data:string[]}){
    const[open,setOpen]= useState(false)
    return(
                <>
                  <button onClick={()=> setOpen(!open)} className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
                    <ActivityIcon  stroke="white" size={15}/>
                    </button>
                  <div className={`${open? "scale-105":"scale-x-90 hidden"} dark:bg-dark-secondary transition-all  duration-1000 absolute bg-white mr-28 mt-20  shadow-md  rounded-sm`}>
                    <ul className="divide-y">
                        {
                            data.map(d=>(
                                <li className="py-1 px-2 dark:hover:bg-dark-tertiary hover:bg-gray-200 hover:rounded-t-md" key={d}><button onClick={()=>onClick(ticket.id+d as string+"a")}>{d}</button></li>
                            ))
                        }
                    </ul>
                  </div>             
      </>
    )
  }