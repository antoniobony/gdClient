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
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function PageNiveau4({params,children}:{children:React.ReactNode,params:{id:string}}){
    
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
    

    const observation = React.createRef<HTMLTextAreaElement>()
    const analyse = React.createRef<HTMLTextAreaElement>()
    const resolution = React.createRef<HTMLTextAreaElement>()
    const ressoureHumaine = React.createRef<HTMLInputElement>()
    const entitePrestataire = React.createRef<HTMLInputElement>()
    const ressoureMaterielle = React.createRef<HTMLInputElement>()
    const evaluationCout =React.createRef<HTMLInputElement>()
    
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

    const sendEmail = async (personnelNiveau3:personnel,niveau:number,code:string) => {
        if (personnel?.email && personnelNiveau3.email) {
            await sendMesssage({
                getEmailFrom: personnel.email,
                emailTo: personnelNiveau3.email,
                url: process.env.NEXT_PUBLIC_APP_BASE_URL+`/ticket/${personnelNiveau3.id}/niveau${niveau}?code=${code}]`
            });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const ticketMod = ticketData?.find(d => d.id == statuTicket.id);
        const assignation = assignationData?.find(d => d.personnel.id == params.id && d.ticket?.id == statuTicket.id);
        const personnelNiveau3 = assignationData?.find(d=>d.ticket?.id == statuTicket.id && 
            d.personnel.poste.designation !=="Opérateur"&& d.personnel.poste.designation !=="Agent"&&
            d.personnel.poste.designation !=="DirecteurES"
        )?.personnel 
        
    
        try {
                const ob = observation.current?.value
            await updateTicket({
                id:statuTicket.id,
                statut: statuTicket.statut,
                niveau: "3",
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
                resolution:resolution.current?.value,
                ressourceHumaine:ressoureHumaine.current?.value,
                ressourceMatierelle:ressoureMaterielle.current?.value,
                entitePrestataire:entitePrestataire.current?.value,
                evaluationCout:evaluationCout.current?.value,
                analyses:analyse.current?.value
            }).unwrap()

                await createRapport({
                    observation: ob,
                    assignation: assignation,
                    dateReception:ticketMod?.updatedAt,
                }).unwrap();
                
                await sendEmail(personnelNiveau3 as personnel,3,ticketMod?.code as string);
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
            handleErrorNotification("Erreur lors de l'envoi")
        }
    
        handleClose();
    };
    

    const Action = (id:string)=>{
        if(id.endsWith("a")){            
                setStatutTicket({
                    id:id.replace("Validationa",""),
                    statut:"Validation"
                })
                setOpen(true)
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

      const [errorText, setErrorText] = useState("");
       
      const changeCout = (e:ChangeEvent<HTMLInputElement>) => {
        const value:any = e.target.value;
        if (isNaN(value) || value < 100000) {
          setErrorText("Veuillez entrer un montant valide (100,000 ou plus).");
        } else {
          setErrorText("");
        }
      };
    
    return(
        <>
        <div className="h-[540px] w-full px-4 pb-8 xl:px-6 ">
            <div className="pt-5">
                <Header name="Ticket" button={    
                    <MyModal name="Ticket" isOpen={open} handleOpen={handleOpen} onClose={handleClose}>
                            <form className="mt-4 space-y-6 flex flex-col  w-[300px] sm:w-[500px] p-3 justify-between" onSubmit={handleSubmit}>
                                <TextAreaField placeholder="analyse" ref={analyse} name="analyse" />
                                <TextAreaField placeholder="observation" ref={observation} name="observation" />
                                <TextAreaField placeholder="resolution" ref={resolution} name="resolution" />
                                <Field placeholder="ressource humaine" type="text" ref={ressoureHumaine}  name="ressourceHumaine"/>
                                <Field  placeholder="entite prestataire" type="text" ref={entitePrestataire}  name="entitePrestataire"/>
                                <Field placeholder="ressource materielle" type="text"  ref={ressoureMaterielle} name="ressourceMaterielle"/>
                                <Field error={!!errorText} errorText={errorText} placeholder="Évaluation coût" type="text" ref={evaluationCout} name="evaluationCout"
                                onChange={changeCout}/>                                
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
               <BoardViewPersonnel rapport={rapportData} assignation={assignationData} data={assignationData?.filter(d=>d.personnel.id == params.id).map(d=>d.ticket) as ticket[]} onClick={Action} update={updateStatut} role="Opérateur"  />
            }                 
        </div>      
        </>
    )
}