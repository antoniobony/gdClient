"use client"

import Tableheader from "@/app/(component)/Table/TableHeader/TableHeader";
import { tableTicket, useGetTableTicketCategorieQuery, useGetTableTicketDepartemmentQuery, useGetTableTicketDirectionQuery, useGetTableTicketFeedBackQuery, useGetTableTicketMonthQuery, useGetTableTicketPersonnelQuery, useGetTableTicketStatutQuery } from "../../state/api";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/(component)/Header/Header";

interface Column {
    id: string | number;
    label: string;
    align?: 'left' | 'right' | 'middle'; 
  }
const dataHeader:Column[]=[
    {
        id: 0,
        label:"Code" ,
        align: 'left'
    },{
        id: 1,
        label:"Quartier" ,
        align: 'left'
    },{
        id: 2,
        label:"Commune" ,
        align: 'left'
    },{
        id: 3,
        label:"Description" ,
        align: 'left'
    },{
        id: 4,
        label:"Résolution" ,
        align: 'left'
    },{
        id: 5,
        label:"Environnement" ,
        align: 'left'
    },{
        id: 6,
        label:"Evaluation Cout" ,
        align: 'left'
    },{
        id: 7,
        label:"Statut" ,
        align: 'left'
    },{
        id: 8,
        label:"Niveau" ,
        align: 'left'
    },{
        id: 9,
        label:"Plaignant" ,
        align: 'left'
    },{
        id: 10,
        label:"Personnel" ,
        align: 'left'
    },{
        id: 11,
        label:"Categorie Ticket" ,
        align: 'left'
    },{
        id: 12,
        label:"Date de création" ,
        align: 'left'
    }
    ,{
        id: 14,
        label:"Date de cloture" ,
        align: 'left'
    }

]


export default  function Page(){
    const params = useSearchParams()
    const keys = Array.from(params.keys())

    const {data:tableTicket,error,isLoading}= params.get("personnel") ? useGetTableTicketPersonnelQuery({Personnel:params.get("personnel") as string}):
    params.get("categorie du ticket") ? useGetTableTicketCategorieQuery({categorie:params.get("categorie du ticket") as string}):
    params.get("direction") ? useGetTableTicketDirectionQuery({direction:params.get("direction") as string}):params.get("departement") ? useGetTableTicketDepartemmentQuery({Departemment:params.get("departement") as string}): 
    params.get("mois") ? useGetTableTicketMonthQuery({month:params.get("mois") as string}) : params.get("statut") ? useGetTableTicketStatutQuery({statut:params.get("statut") as string}):
    useGetTableTicketFeedBackQuery({statut: params.get("feedBack") as string})

    return(
        <>
            <div className="pt-5">
                <Header name={`Table des ticket par ${keys.map(k => k.valueOf())}`} />
            </div>
            <div
            className=" overflow-y-auto p-5"
            style={{
            scrollbarWidth: "none",
            scrollbarColor: "gray lightgray",
            }}
            >
                <div className=" table w-full rounded-sm border dark:border-black-800 shadow-lg">
                <Tableheader data={dataHeader}/>
                <div className="table-row-group ">
                    {
                        tableTicket?.map((row,i)=>(
                            <div className={`table-row ${i % 2 ==0 ? "bg-gray-100":"bg bg-gray-200"} dark:bg-gray-800`} key={i}>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.code}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.quartier}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.commune}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.description}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.resolution}
                                </div>
                                <div className="table-cell p-4 dark:text-white" >
                                    {row.environnement}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.cout} Ar
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.statut}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.niveau}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.plaignant}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.personnel}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {row.categorie}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {new Date(row.dateCreation).toLocaleString()}
                                </div>
                                <div className="table-cell p-4 dark:text-white">
                                    {new Date(row.dateCloture).toLocaleString()}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            </div>
        </>
    )
}