"use client"
import { CardAgent1, CardAgent2, CardDepartDir, CardDirecteurES1 } from "@/app/(component)/Card/Card";
import Error from "@/app/(component)/Error/Error";
import { Modal } from "@/app/(component)/Modal/Modal";
import { direction, rapportTicket, ticket, useGetAssignationQuery, useGetPersonnelByIdQuery, useGetPersonnelQuery, useGetPosteQuery, useGetQuartierQuery, useGetRapportTicketQuery, useGetTicketIdQuery, useGetTicketQuery } from "@/app/state/api";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({params}:{params:{id:string,idTicket:string}}){
    const {data:ticketData,error:errorTicket,isLoading} = useGetTicketIdQuery({pId:params.idTicket})
    const {data:quartier,error:errorQuartier} = useGetQuartierQuery()
    const {data:assignationData,error:erroAssignation,isLoading:isLoadingAssignation} = useGetAssignationQuery()
    const {data:rapportData,error:errorRapport,isLoading:isLoadingRapport} = useGetRapportTicketQuery() 
    const {data:poste, error:errorPoste} = useGetPosteQuery()
    const router = useRouter()
    
    const onclose=()=>{
        router.back()
    }

    if(isLoading || isLoadingRapport  || isLoadingAssignation) return <CircularProgress/>
    if(errorPoste || errorRapport || erroAssignation) return <Error/>
    
    const time5  = new Date(rapportData?.findLast(d=>d.assignation.id == assignationData?.findLast(d=>d.personnel.id == params.id && d.ticket?.id == params.idTicket)?.id)?.dateTransmission as string).getTime()

    return(
        <>
            <Modal isOpen={true} onClose={onclose} name="Niveau 2">
                {
                    ticketData?.statut ==="Traitement"&& ticketData.niveau == 2 &&(
                        <CardAgent1 data={ticketData as ticket} commune={quartier?.find(d=>d.designation === ticketData?.quartier)?.commune.designation as string}/>
                    )
                }
                {
                    (((ticketData?.statut === "Traitement" || ticketData?.statut === "Retraitement")  && ticketData.niveau == 3 )||
                    (ticketData?.statut=== "Clôturer" && ticketData.niveau == 2 ))&&(
                        <CardDirecteurES1 poste="DirecteurES" data={ticketData as ticket} rapport={rapportData?.findLast(d=>d.assignation?.id == (assignationData?.find(d=>d.personnel.id == params.id && d.ticket?.id == params.idTicket)?.id)) as rapportTicket}
                        dirDepar={(poste?.find(d=>d.id == assignationData?.findLast(d=>Math.abs(new Date(d.dateAssignation as string).getTime()-time5)<1  && d.ticket?.id == params.idTicket && d.personnel.id != params.id && d.personnel.poste.designation !=="Agent" && d.personnel.poste.designation !=="Opérateur" && d.personnel.poste.designation !=="DirecteurES")?.personnel.poste.id)?.departement !== null ?
                        poste?.find(d=>d.id == assignationData?.findLast(d=>Math.abs(new Date(d.dateAssignation as string).getTime()-time5) < 1  && d.ticket?.id == params.idTicket && d.personnel.id != params.id && d.personnel.poste.designation !=="Agent" && d.personnel.poste.designation !=="Opérateur" && d.personnel.poste.designation !=="DirecteurES")?.personnel.poste.id)?.departement:
                        poste?.find(d=>d.id == assignationData?.findLast(d=>Math.abs(new Date(d.dateAssignation as string).getTime()-time5)<1  && d.ticket?.id == params.idTicket && d.personnel.id != params.id && d.personnel.poste.designation !=="Agent" && d.personnel.poste.designation !=="Opérateur" && d.personnel.poste.designation !=="DirecteurES")?.personnel.poste.id)?.direction) as direction }
                        />
                    )
                }
                        

                {
                    (ticketData?.statut ==="A clôturé"|| ticketData?.statut === "Retraitement") && ticketData.niveau == 2 &&(
                        <CardAgent2 data={ticketData} rapport={rapportData?.findLast(d=>d.assignation?.id == (assignationData?.find(d=>d.personnel.poste.designation === "Agent" && d.ticket?.id == params.idTicket)?.id)) as rapportTicket}/>   
                    )
                }
                {
                    ticketData?.statut ==="Validation" &&(
                        <CardDepartDir data={ticketData as ticket} rapport={rapportData?.findLast(d=>d.assignation?.id == (assignationData?.find(d=>d.personnel.poste.designation !=="Agent"&&d.personnel.poste.designation !=="Opérateur"
                            && d.personnel.poste.designation !=="DirecteurES"&& d.ticket?.id == params.idTicket)?.id)) as rapportTicket}
                            operateur={assignationData?.findLast(d=>d.ticket?.id == params.idTicket && d.personnel.poste.designation ==="Opérateur")?.personnel.nom +" "+assignationData?.find(d=>d.ticket?.id == params.idTicket && d.personnel.poste.designation ==="Opérateur")?.personnel.prenom}
                        />
                    )
                }
            </Modal>
        </>
    )
}