import React from "react";
import PageAttachement from "./page";

export default function Default({children,params}:{params:{id:string},children:React.ReactNode}){
    return(
        <PageAttachement params={params} children={children}/>
    )
}