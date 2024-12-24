
import Header from "@/app/(component)/Header/Header";
import DashboardWrapper from "@/app/dashboardWrapper";
import React from "react";

export default function Layout({children}:{children:React.ReactNode}){
    return(
        <>
            <DashboardWrapper>
                <div className="p-4">
                  {children}    
                    
                </div>
        </DashboardWrapper>
        </>
    )
}