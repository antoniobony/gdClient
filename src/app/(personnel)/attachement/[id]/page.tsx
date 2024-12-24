"use client"
import { personnel, ticket, useCreateAssignationMutation, useCreateAttachementMutation, useCreateRapportTicketMutation, useCreateTicketMutation, useDeleteTicketMutation, useGetAssignationQuery, useGetAttachementIdQuery, useGetAttachementQuery, useGetDocumentQuery, useGetEnvironnementIdQuery, useGetEnvironnementQuery, useGetImageQuery, useGetPersonnelByIdQuery, useGetPersonnelByPosteQuery, useGetPersonnelQuery, useGetQuartierQuery, useGetTicketQuery, useGetVideoQuery, useGetVocalQuery, useSendMessageMutation, useUpdateAttachementMutation, useUpdateDocumentMutation, useUpdateImageMutation, useUpdateTicketMutation, useUpdateTicketStatutMutation, useUpdateVideoMutation, useUpdateVocalMutation, vocal } from "@/app/state/api";
import { useRouter } from "next/navigation";
import AttachementColumn from "@/app/(component)/Board/boardAttachement";
import Header from "@/app/(component)/Header/Header";
import { CircularProgress } from "@mui/material";
import Error from "@/app/(component)/Error/Error";

export default function PageAttachement({params,children}:{children:React.ReactNode,params:{id:string}}){
    
    const {data:Ticket,error:errorTicket,isLoading:isLoadingTicket} = useGetTicketQuery()
    const{data:assignationData,error:errorAssignation,isLoading:loadingAssignation} = useGetAssignationQuery()
    const {data:attachement,error:errorAttachement,isLoading:isLoadingAttachement} = useGetAttachementQuery()
    
    const router = useRouter()
    
    const onClick=(id:string,name:string)=>{
        router.push(`/attachement/${params.id}/visual/${id}`)
    }

    if(isLoadingAttachement ||  isLoadingTicket || loadingAssignation) return <CircularProgress/>
    if(errorAssignation || errorAttachement || errorTicket ) return <Error/>
    return(
        <>
        <div className="h-full w-full px-4 pb-8 xl:px-6 ">
            <div className="pt-5">
                <Header name="Attachement"/>
            </div>
            <div className={`grid  grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4 `} > 
                <AttachementColumn name="Document" data={attachement?.find(d=>d.ticket.id == (assignationData?.find(d=>d.personnel.id == params.id)?.ticket?.id))?.documents as vocal[]} onClick={onClick}/>
                <AttachementColumn name="Image" data={attachement?.find(d=>d.ticket.id == (assignationData?.find(d=>d.personnel.id == params.id)?.ticket?.id))?.images as vocal[]} onClick={onClick}/>
                <AttachementColumn name="Vidéo" data={attachement?.find(d=>d.ticket.id == (assignationData?.find(d=>d.personnel.id == params.id)?.ticket?.id))?.videos as vocal[]} onClick={onClick}/>
                <AttachementColumn name="Vocal" data={attachement?.find(d=>d.ticket.id == (assignationData?.find(d=>d.personnel.id == params.id)?.ticket?.id))?.vocals as vocal[]} onClick={onClick}/>
            </div>
            {children}    
        </div> 
        </>
    )
}
