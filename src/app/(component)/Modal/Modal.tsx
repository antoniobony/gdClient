import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header/Header";
import { X } from "lucide-react";


type Props = {
    children:React.ReactNode;
    isOpen:boolean;
    onClose:()=>void
    name:string;
}

 export const Modal = ({children,isOpen,onClose,name}:Props)=>{
    if(!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center transition duration-150 ease-in delay-150 overflow-y-auto bg-gray-600 bg-opacity-50 p-40">
            <div className=" shadow-lg border-2 border-blue-primary border-solid rounded-3xl bg-white p-4 ">
                <Header name={name} isSmallText button={
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-primary  hover:bg-blue-600"
                 onClick={onClose}
                >
                    <X size={18}/>
                </button>    
                    } />
                    {children}
            </div>    
        </div>,
        document.body,
    )
}

type PropsMy = {
    children:React.ReactNode,
    isOpen:boolean,
    onClose:()=>void,
    name:string,
    handleOpen:()=>void,
    button?:boolean
}

export const MyModal=({children,isOpen,onClose,name,handleOpen,button}:PropsMy)=>{
    
    return(
        <>
            {button && <button className=" px-4 py-1 text-sm text-blue-600 font-semibold rounded-md border border-blue-600 dark:text-white dark:bg-blue-600" onClick={handleOpen}>Ajouter</button>  }
            <Modal isOpen={isOpen} onClose={onClose} name={name}>
                {children}
            </Modal>
        </>
    )
}

