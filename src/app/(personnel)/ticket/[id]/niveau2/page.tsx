"use client"
import { BoardViewPersonnel } from "@/app/(component)/Board/board";
import Error from "@/app/(component)/Error/Error";
import Field from "@/app/(component)/Field/Fields";
import TextAreaField from "@/app/(component)/Field/TextAreaField";
import Header from "@/app/(component)/Header/Header";
import { MyModal } from "@/app/(component)/Modal/Modal";
import Selects from "@/app/(component)/Select/Select";
import { personnel, ticket, useCreateAssignationMutation, useCreateAttachementMutation, useCreateRapportTicketMutation, useCreateTicketMutation, useDeleteTicketMutation, useGetAssignationQuery, useGetDepartementQuery, useGetDirectionQuery, useGetEnvironnementIdQuery, useGetEnvironnementQuery, useGetPersonnelByIdQuery, useGetPersonnelByPosteQuery, useGetPersonnelQuery, useGetPosteQuery, useGetTicketQuery, useSendMessageMutation, useUpdateAttachementMutation, useUpdateImageMutation, useUpdateTicketMutation, useUpdateTicketStatutMutation, vocal } from "@/app/state/api";
import { Directions } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function PageNiveau2({params,children}:{children:React.ReactNode,params:{id:string}}){
    
    const {data:personnel,error:errorPersonnel}=useGetPersonnelByIdQuery({personnelId:params.id})
    const {data:directionData,error:errorDirectionData,isLoading:isLoadingDirection} = useGetDirectionQuery()
    const {data:departement,error:errorDepartement,isLoading:isLoadingDepartement} = useGetDepartementQuery()
    const {data:personnelPoste,error:errorPersonnelPoste,isLoading:isLoadingPersonnelPoste}=useGetPersonnelQuery()
    const {data:poste,error:errorPoste,isLoading:isLoadingPoste} = useGetPosteQuery()
    const [createattachment,{error:errorAttachement}]= useCreateAttachementMutation()
    const [updateAttachement,{error:errorUpdateAttachement}]=useUpdateAttachementMutation() 
    const{data:assignationData,error:errorAssignation,isLoading:loadingAssignation}=useGetAssignationQuery()
    const[createAssignation,{error:errorAssigna}]= useCreateAssignationMutation()
    const {data:environnement,error:errorEnvironnement,isLoading:isLoadingEnvironnement} = useGetEnvironnementQuery()
    const {data:ticketData,error:errorTicketData,isLoading:isLoadingTicket}= useGetTicketQuery()
    const [updateTicket,{error:errroUpdateTicket,isLoading:isLoadingUpdateTicket}]=useUpdateTicketMutation()
    const [updateStatutTicket,{error:errroUpdateStatutTicket,isLoading:isLoadingUTicket}]=useUpdateTicketStatutMutation()
    const [createRapport,{error:errorCreateRapport,isLoading:isLoadingCreateRapport}] = useCreateRapportTicketMutation()
    const [sendMesssage,{error:errorMessage,isLoading:isLoadingMessage}] = useSendMessageMutation()
    
    const [statuTicket,setStatutTicket]=useState({id:"",statut:""})
    const [open,setOpen]=useState(false)
    

    const directionOudepartement = React.createRef<HTMLSelectElement>()
    const observation = React.createRef<HTMLTextAreaElement>()
  

    const router = useRouter()

    const handleClose=()=>{
        setStatutTicket({id:"",statut:""})
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const updateStatut=async(data:ticket,statut:string)=>{
         
    }

    const sendEmail = async (personnelNiveau:personnel,niveau:number,code:string) => {
        if (personnel?.email && personnelNiveau.email) {
            await sendMesssage({
                getEmailFrom: personnel.email,
                emailTo: personnelNiveau.email,
                url: process.env.NEXT_PUBLIC_APP_BASE_URL+`/ticket/${personnelNiveau.id}/niveau${niveau}?code=${code}`
            });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const dateTransmission = new Date().toISOString()
        const ticketMod = ticketData?.find(d => d.id == statuTicket.id);
        const assignation = assignationData?.find(d => d.personnel.id == params.id && d.ticket?.id == statuTicket.id);
        const personnelDirectionOuDepartement = personnelPoste?.find(d => 
            d.poste?.designation ===  poste?.find(d=>d.departement?.designation === directionOudepartement.current?.value)?.designation  ||
            d.poste?.designation === poste?.find(d=>d.direction?.designation === directionOudepartement.current?.value)?.designation
        );
        const o = observation.current?.value
    
        try {
            if (statuTicket.statut === "Clôturer") {
                await updateTicket({
                    id:statuTicket.id,
                    statut: statuTicket.statut,
                    niveau: "2",
                    description: ticketMod?.description,
                    categorieTicket: ticketMod?.categorieTicket,
                    environnement: ticketMod?.environnement,
                    quartier: ticketMod?.quartier,
                    nom:ticketMod?.nom ,
                    prenom:ticketMod?.prenom ,
                    cin:ticketMod?.cin ,
                    sexe:ticketMod?.sexe,
                    dateNaissance:ticketMod?.dateNaissance ,
                    code:ticketMod?.code,
                    dateCreation:ticketMod?.dateCreation,
                    reference:ticketMod?.reference,
                    feedback:ticketMod?.feedback,
                    commentairePLaignant:ticketMod?.commentairePLaignant,
                    DateRencotrePlaignant:ticketMod?.DateRencotrePlaignant,
                    updatedAt:ticketMod?.updatedAt,
                    resolution:ticketMod?.resolution,
                    ressourceHumaine:ticketMod?.ressourceHumaine,
                    ressourceMatierelle:ticketMod?.ressourceMatierelle,
                    entitePrestataire:ticketMod?.entitePrestataire,
                    evaluationCout:ticketMod?.evaluationCout,
                    analyses:ticketMod?.analyses,
                    dateCloture:dateTransmission
                }).unwrap()             
                await createRapport({
                    observation: o,
                    assignation: assignation,
                    dateReception:ticketMod?.updatedAt,
                }).unwrap();
    
                
            }
    
            else if(["Retraitement", "Traitement"].includes(statuTicket.statut)) {
                    await createRapport({
                        observation: observation.current?.value,
                        assignation: assignation,
                        dateReception:ticketMod?.updatedAt,
                    }).unwrap();    
                
                await createAssignation({
                    ticket: ticketMod,
                    personnel: personnelDirectionOuDepartement,
                }).unwrap();
    
                await updateStatutTicket({
                    id: statuTicket.id,
                    statut: statuTicket.statut, 
                    niveau: "3",
                }).unwrap();
    
                await sendEmail(personnelDirectionOuDepartement as personnel,3,ticketMod?.code as string);
                
            }
            handleSuccessNotification("Envoi du ticket au niveau 3 avec succès")
        } catch (error) {
            if(errroUpdateStatutTicket)
                console.log(errroUpdateStatutTicket)
        
            if(errorAssigna)
                console.log(errorAssigna)
            if(errorCreateRapport)
                console.log(errorCreateRapport)
            if(errorMessage)
                console.log(errorMessage)

            handleErrorNotification("Erreur lors de l'envoie du ticket au niveau 3")
            
        }
    
        handleClose();
    };
    
    const update=async(statut:string,id:string)=>{
        try{
            const personnelAgent = assignationData?.find(d=>d.ticket?.id == statuTicket.id && d.personnel.poste.designation === "Agent")?.personnel
            await updateStatutTicket({
                id:id,
                statut:statut,
                niveau:"1",
            }).unwrap()

            await sendEmail(personnelAgent as personnel,1,ticketData?.find(d=>d.id == statuTicket.id )?.code as string);
            handleSuccessNotification("Envoi du ticket au niveau 1 avec succès")
        }catch(error){
            if(errroUpdateStatutTicket)
                console.log(errroUpdateStatutTicket)
            handleErrorNotification("Erreur lors de l'envoie du ticket au niveau 1")
        }
    }
    const Action = (id:string)=>{
        if(id.endsWith("a")){
            if(id.endsWith("Validationa")){
                update("Validation",id.replace("Validationa",""))
            }
            else if(id.endsWith("Retraitementa")){
                setStatutTicket({
                    id:id.replace("Retraitementa",""),
                    statut:"Retraitement"
                })
                setOpen(true)
            }
            else if(id.endsWith("Traitementa")){
                 setStatutTicket({
                    id:id.replace("Traitementa",""),
                    statut:"Traitement"
                })
                setOpen(true)
            }else{
                console.log(id.replace("Clôturera",""))
                setStatutTicket({
                    id:id.replace("Clôturera",""),
                    statut:"Clôturer"
                })
                setOpen(true)
            }
                        
        }else if(id.endsWith("v")){
            router.push(`/ticket/${params.id}/detail/${id.replace("v","")}`)
        }

    }
    const  handleSuccessNotification = (message:string): void => {
        toast.success(message, {
          autoClose: 3000, // 3 secondes
        });
      };
    
      const handleErrorNotification = (message:string): void => {
        toast.error(message, {
          autoClose: 5000, // 5 secondes
        });
      };
    const inputStyles = "w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary dark:text-white dark:focus:outline-none";
    
    return(
        <>
        <div className="h-[540px] w-full px-4 pb-8 xl:px-6 ">
            <div className="pt-5">
                <Header name="Ticket" button={    
                    <MyModal isOpen={open} handleOpen={handleOpen} onClose={handleClose} name={"Ajouter"} >
                            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                                {
                                    statuTicket.statut !== "Clôturer" &&(
                                        <Selects data={(directionData?.map(d => d.designation) || []).concat(departement?.map(d => d.designation) || [])} defaultValue={directionData?.findLast(d=>d.designation)?.designation} label="Direction et Departement" name="DirDepart" ref={directionOudepartement} />
                                    )
                                }
                                {
                                    statuTicket.statut !== "Traitement" &&(
                                        <TextAreaField  ref={observation} name="observation"  />
                                    )
                                }
                                
                                <button type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                                 bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
                                 focus:ring-blue-600 focus-offset-2 
                                `}>
                               Confirmer
                                </button>
                            </form>
                </MyModal>}
                 isSmallText/>
            </div>
            {
               errorAssignation ? <Error/>  :  loadingAssignation? <CircularProgress/> :
               <BoardViewPersonnel data={assignationData?.filter(d=> d.personnel?.id == params.id ).map(d=>d.ticket) as ticket[]} onClick={Action} update={updateStatut} role="DirecteurES"  />
            }             
        </div>
        {children}
        </>
    )
}