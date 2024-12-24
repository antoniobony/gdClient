"use client"
import { CardAgent1, CardAgent2, CardDirecteurES1 } from "@/app/(component)/Card/Card";
import { Modal } from "@/app/(component)/Modal/Modal";
import { direction, rapportTicket, ticket, useGetAssignationIdQuery, useGetAssignationQuery, useGetPersonnelByIdQuery, useGetPosteQuery, useGetQuartierQuery, useGetRapportTicketQuery, useGetTicketIdQuery, useGetTicketQuery } from "@/app/state/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({params}:{params:{id:string,idTicket:string}}){

    const {data:ticketData,error:errorTicket,isLoading} = useGetTicketIdQuery({pId:params.idTicket})
    const {data:quartier,error:errorQuartier} = useGetQuartierQuery()
    const {data:rapportData,error:errorRapport} = useGetRapportTicketQuery() 
    const {data:assignationData,error:erroAssignation} = useGetAssignationQuery()
    const {data:poste, error:errorPoste} = useGetPosteQuery()

    const router = useRouter()
    
    const onclose=()=>{
        router.back()
    }

    useEffect(()=>{
        console.log(rapportData?.findLast(d=>d.assignation?.id == (assignationData?.find(d=>d.personnel.id == params.id && d.ticket?.id == params.idTicket)?.id)))
    },[rapportData])
    return(
        <>
            <Modal isOpen={true} onClose={onclose} name="Niveau 1">
                {
                    (ticketData?.statut ==="Créer" || ticketData?.statut ==="Traitement" )&&(
                        <CardAgent1 data={ticketData as ticket} commune={quartier?.find(d=>d.designation === ticketData?.quartier)?.commune.designation as string}/>
                    )
                }
                {
                    (ticketData?.statut === "Retraitement"|| ticketData?.statut === "A clôturer") &&(
                        <CardAgent2 poste="Agent" data={ticketData} rapport={rapportData?.findLast(d=>d.assignation?.id == (assignationData?.find(d=>d.personnel.id == params.id && d.ticket?.id == params.idTicket)?.id)) as rapportTicket}/>
                    )
                }
                    {
                    ticketData?.statut ==="Validation" &&(
                        <CardDirecteurES1 data={ticketData as ticket} rapport={rapportData?.findLast(d=>d.assignation?.id == (assignationData?.find(d=>d.personnel.id == params.id && d.ticket?.id == params.idTicket)?.id)) as rapportTicket}
                            dirDepar={(poste?.find(d=>d.id == assignationData?.find(d=>d.ticket?.id == params.idTicket && d.personnel.id != params.id && d.personnel.poste.designation !=="Agent" && d.personnel.poste.designation !=="Opérateur" && d.personnel.poste.designation !=="DirecteurES")?.personnel.id)?.departement !== null ?
                                poste?.find(d=>d.id == assignationData?.find(d=>d.ticket?.id == params.idTicket && d.personnel.id != params.id && d.personnel.poste.designation !=="Agent" && d.personnel.poste.designation !=="Opérateur" && d.personnel.poste.designation !=="DirecteurES")?.personnel.id)?.departement:
                             poste?.find(d=>d.id == assignationData?.find(d=>d.ticket?.id == params.idTicket && d.personnel.id != params.id && d.personnel.poste.designation !=="Agent" && d.personnel.poste.designation !=="Opérateur" && d.personnel.poste.designation !=="DirecteurES")?.personnel.id)?.direction) as direction }
                        />
                    )
                }
                
            </Modal>
        </>
    )
}