import React from "react";
import DashboardWrapper from "../../dashboardWrapper";
import Header from "../../(component)/Header/Header";

export default function Layout({
    ticketCategory,
    ticketPersonnel,
    children,
    directionChart,
    monthChart,
    statutChart,
    feedBack
  }: {
    children: React.ReactNode;
    ticketPersonnel:React.ReactNode;
    ticketCategory:React.ReactNode;
    directionChart:React.ReactNode;
    monthChart:React.ReactNode;
    statutChart:React.ReactNode;
    feedBack:React.ReactNode;
  }) {
  
    return (
      <>
        <DashboardWrapper>
        <div className="p-4">
            <div className="pt-5">
                <Header name="Table de bord" />
            </div>
                    <div className="grid  grid-cols-1 gap-3 p-4 md:grid-cols-3 mx-auto">
                        {children}
                        {ticketPersonnel}
                        {ticketCategory}
                        {directionChart}
                        {monthChart}
                        {statutChart}
                        {feedBack}
                    </div>    
        </div>
        </DashboardWrapper>
      
      </>
    );
  }
  