"use client"
import { CardAgent1, CardAgent2, CardDepartDir, CardDirecteurES1, CardOperateur } from "@/app/(component)/Card/Card";
import Error from "@/app/(component)/Error/Error";
import { Modal } from "@/app/(component)/Modal/Modal";
import { direction, rapportTicket, ticket, useGetAssignationQuery, useGetPersonnelByIdQuery, useGetPersonnelQuery, useGetPosteQuery, useGetQuartierQuery, useGetRapportTicketQuery, useGetTicketIdQuery, useGetTicketQuery } from "@/app/state/api";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({params}:{params:{id:string,idTicket:string}}){
    const {data:ticketData,error:errorTicket,isLoading} = useGetTicketIdQuery({pId:params.idTicket})
    const {data:assignationData,error:erroAssignation,isLoading:isLoadingAssignation} = useGetAssignationQuery()
    const {data:rapportData,error:errorRapport,isLoading:isLoadingRapport} = useGetRapportTicketQuery() 
    const {data:poste, error:errorPoste} = useGetPosteQuery()
    const {data:personnel,error:errorPersonnel,isLoading:isLoadingPersonnelPoste} = useGetPersonnelByIdQuery({personnelId:params.id})
    const router = useRouter()
    
    const onclose=()=>{
        router.back()
    }
    if(isLoading || isLoadingRapport  || isLoadingAssignation || isLoadingPersonnelPoste) return <CircularProgress/>
    if(errorPoste || errorRapport || erroAssignation) return <Error/>
    return(
        <>
            <Modal isOpen={true} onClose={onclose} name="Niveau 3">
                {
                    ticketData?.niveau == 4 &&(
                        <CardDepartDir poste="niveau3" data={ticketData as ticket} rapport={rapportData?.findLast(d=>d.assignation?.id == (assignationData?.find(d=>d.personnel.id == params.id && d.ticket?.id == params.idTicket)?.id)) as rapportTicket}
                            operateur={(assignationData?.find(d=>d.ticket?.id == params.idTicket && d.personnel.poste.designation ==="Opérateur")?.personnel.nom +" "+assignationData?.find(d=>d.ticket?.id == params.idTicket && d.personnel.poste.designation ==="Opérateur")?.personnel.prenom) as string}
                        />
                    )
                }
                {
                    ticketData?.niveau == 3 && ticketData?.statut !=="Validation" &&(
                        <CardDirecteurES1 data={ticketData as ticket} rapport={rapportData?.findLast(d=>d.assignation?.id == assignationData?.find(d=>d.personnel.poste.designation === "DirecteurES" && d.ticket?.id == params.idTicket)?.id) as rapportTicket}
                            dirDepar={(poste?.find(d=>d.id ==(personnel?.poste.id))?.direction !== null ? poste?.find(d=>d.id ==(personnel?.poste.id))?.direction:poste?.find(d=>d.id ==(personnel?.poste.id))?.departement) as direction }
                        />
                    )
                }
                {
                    ticketData?.statut === "Validation" &&(
                    <CardOperateur data={ticketData as ticket} rapport={rapportData?.findLast(d=>d.assignation?.id == (assignationData?.findLast(d=>d.personnel.poste.designation == "Opérateur" && d.ticket?.id == params.idTicket)?.id)) as rapportTicket}/>
                )}

            </Modal>
        </>
    )
}