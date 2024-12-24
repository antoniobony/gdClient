import DashboardWrapper from "@/app/dashboardWrapper";
import React from "react";

export default function Layout({children,atta}:{children:React.ReactNode,atta:React.ReactNode}){
    return(
        <>
          <DashboardWrapper>
            {children}
            {atta}
          </DashboardWrapper>
            
        </>
    )

}