import DashboardWrapper from "@/app/dashboardWrapper";
import React from "react";

export default function Layout({children}:{children:React.ReactNode}){
    return(
        <>
            <DashboardWrapper>
                {children}
            </DashboardWrapper>
        </>
    )
}