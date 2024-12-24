import React, { useState } from "react";
import { MyModal } from "./Modal";
import axios from 'axios'


type Props={
    isOpen:boolean,
    onClose:()=>void
}




export const ModalForm=()=>{
    const [designation,setDesignation]= useState('')
    const [open,setOpen]=useState(false)
    const inputStyles = "w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary dark:text-white dark:focus:outline-none";
    
    const handleSubmit=()=>{
        addDate()
    }   
    
    const handleClose=()=>{
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const addDate = ()=>{
        axios.post(
            "http://localhost:8080/api/commune",
        {
            data:{
                "designation":designation
            }
        },{ 
            headers:{
            "Accept":"*/*",
            "Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWthcnlAZ21haWwuY29tIiwiaWF0IjoxNzI4NTA0MzM5LCJleHAiOjE3Mjg2NzcxMzl9.-ZQ2ssu7SUCgXtlblRgatdvcHDmGKQkG19D778O7e7Q",
          }}).then(
            e=>{
                alert(e)
            }
        ).catch(er=>console.log(er))

 
    }

    return (<MyModal isOpen={open} handleOpen={handleOpen} onClose={handleClose} name="modal" >
            <form className="mt-4 space-y-6" onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
                <input   type="text" className={inputStyles} onChange={(e)=>setDesignation(e.target.value)} required/>
                <button type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                    bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
                    focus:ring-blue-600 focus-offset-2 
                    `}>
                        Ajouter
                    </button>
            </form>
        </MyModal>)
    
}
