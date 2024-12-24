"use client"
import { BoardViewPersonnel } from "@/app/(component)/Board/board";
import Error from "@/app/(component)/Error/Error";
import Field from "@/app/(component)/Field/Fields";
import TextAreaField from "@/app/(component)/Field/TextAreaField";
import Header from "@/app/(component)/Header/Header";
import { MyModal } from "@/app/(component)/Modal/Modal";
import Selects from "@/app/(component)/Select/Select";
import { personnel, ticket, useCreateAssignationMutation, useCreateAttachementMutation, useCreateRapportTicketMutation, useCreateTicketMutation, useDeleteTicketMutation, useGetAssignationQuery, useGetDepartementQuery, useGetDirectionQuery, useGetEnvironnementIdQuery, useGetEnvironnementQuery, useGetPersonnelByIdQuery, useGetPersonnelByPosteQuery, useGetPersonnelQuery, useGetPosteQuery, useGetRapportTicketQuery, useGetTicketQuery, useSendMessageMutation, useUpdateAttachementMutation, useUpdateImageMutation, useUpdateTicketMutation, useUpdateTicketStatutMutation, vocal } from "@/app/state/api";
import { Directions } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import React, {  useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function PageNiveau3({params,children}:{children:React.ReactNode,params:{id:string}}){
    
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
    const {data:rapportData,error:errorRapport,isLoading:isLoadingRapport} = useGetRapportTicketQuery()

    const [statuTicket,setStatutTicket]=useState({id:"",statut:""})
    const [open,setOpen]=useState(false)
    

    const operateur = React.createRef<HTMLSelectElement>()
    const observation = React.createRef<HTMLTextAreaElement>()
    const instruction  = React.createRef<HTMLTextAreaElement>()
    

    const handleClose=()=>{
        setStatutTicket({id:"",statut:""})
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const router = useRouter()

    const updateStatut=async(data:ticket,statut:string)=>{
         
    }

    const sendEmail = async (personnelNiveau: personnel,niveau:number,code:string) => {
        if (personnel?.email && personnelNiveau.email) {
            await sendMesssage({
                getEmailFrom: personnel.email,
                emailTo: personnelNiveau.email,
                url: process.env.NEXT_PUBLIC_APP_BASE_URL+`/ticket/${personnelNiveau.id}/niveau${niveau}?code=${code}`
            }).unwrap();
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const dateTransmission = new Date().toISOString()
        const ticketMod = ticketData?.find(d => d.id == statuTicket.id);
        const assignation = assignationData?.find(d => d.personnel.id == params.id && d.ticket?.id == statuTicket.id);
        const personnelOperateur = personnelPoste?.find(d => d.nom +" "+d.prenom ===  operateur.current?.value && d.poste.designation ==="Opérateur");
        const Operateur = assignationData?.find(d=>d.ticket?.id == statuTicket.id && d.personnel.poste.designation ==="Opérateur")?.personnel 
    
        try {
            if (statuTicket.statut === "Traitement") {
                await createRapport({
                    instruction: instruction.current?.value,
                    assignation: assignation,
                    dateReception:ticketMod?.updatedAt,
                }).unwrap();
    
                await createAssignation({
                    ticket: ticketMod,
                    personnel: personnelOperateur,
                }).unwrap();
                
                await updateStatutTicket({
                    id: statuTicket.id,
                    statut: statuTicket.statut,
                    niveau: "4",
                }).unwrap();
    
                await sendEmail(personnelOperateur as personnel,4,ticketMod?.code as string);
            }
            else{
                    await createRapport({
                        observation: observation.current?.value,
                        assignation: assignation,
                        dateReception:ticketMod?.updatedAt,
                        dateTransmission:dateTransmission   
                    }).unwrap();   
                    
                await updateStatutTicket({
                    id: statuTicket.id,
                    statut: statuTicket.statut, 
                    niveau: "4",
                }).unwrap();
    
                await sendEmail(Operateur as personnel,4,ticketMod?.code as string);
            }
            handleSuccessNotification("Envoi du ticket au niveau 4 avec succès")
        } catch (error) {
            if(errroUpdateStatutTicket)
                console.log(errroUpdateStatutTicket)
        
            if(errorAssigna)
                console.log(errorAssigna)
            if(errorCreateRapport)
                console.log(errorCreateRapport)
            if(errorMessage)
                console.log(errorMessage)
            handleErrorNotification("Erreur lors de l'envoi du ticket au niveau 4")
        }
    
        handleClose();
    };
    
    const update=async(statut:string,id:string)=>{
        try{
            await updateStatutTicket({
                id: id,
                statut: statut,
                niveau: "2",
            }).unwrap()

            await sendEmail(personnelPoste?.find(d => d.poste?.designation ===  "DirecteurES") as personnel,2,ticketData?.find(d=>d.id == id)?.code as string);
            handleSuccessNotification("Envoi du ticket au niveau 2 avec succès")

        }catch(errroUpdateStatutTicket){
            console.log(errroUpdateStatutTicket)
            handleErrorNotification("Une erreur s'est produite lors de l'envoi du tikcet au niveau 2")
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
            else{
                setStatutTicket({
                    id:id.replace("Traitementa",""),
                    statut:"Traitement"
                    })
                    setOpen(true)
    }
                
        }else if(id.endsWith("v")){
            router.push(`/ticket/${params.id}/detail/${id.replace("v","")}`)
        }

    }

    const inputStyles = "w-full rounded border border-gray-300 p-2  shadow-sm dark:border-dark-tertiary dark:text-white dark:focus:outline-none";
    
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
    return(
        <>
        <div className="h-[540px] w-full px-4 pb-8 xl:px-6 ">
            <div className="pt-5">
                <Header name="Ticket" button={    
                    <MyModal isOpen={open} handleOpen={handleOpen} onClose={handleClose} name={"Ajouter"} >
                    
                            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
                                {
                                    statuTicket.statut === "Traitement" &&(
                                        <Selects data={personnelPoste?.filter(d => d.poste.designation === "Opérateur")?.map(d=>d.nom +" "+d.prenom) as string[]} defaultValue={personnelPoste?.findLast(d=>d.poste.designation === "Opérateur")?.nom+" "+personnelPoste?.findLast(d=>d.poste.designation === "Opérateur")?.prenom} 
                                         name="Opérateur" ref={operateur} />
                                    )
                                }
                                {
                                    statuTicket.statut === "Retraitement" &&
                                    <TextAreaField placeholder="observation"  ref={observation} name="observation" />
                                }
                                
                                {
                                    statuTicket.statut === "Traitement" &&(
                                        <TextAreaField placeholder="instruction" ref={instruction} name="instruction" />
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
               <BoardViewPersonnel rapport={rapportData} assignation={assignationData} data={assignationData?.filter(d=>d.personnel.id == params.id).map(d=>d.ticket) as ticket[]} onClick={Action} update={updateStatut} role="ChefDepart"  />
            }
        </div>
        </>
    )
}