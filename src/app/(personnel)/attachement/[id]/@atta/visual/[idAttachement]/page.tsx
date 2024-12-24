"use client"
import Error from "@/app/(component)/Error/Error"
import { Modal, MyModal } from "@/app/(component)/Modal/Modal"
import { ModalForm } from "@/app/(component)/Modal/ModalForm"
import { useGetImageIdQuery, useGetVideoQuery, useGetVocalIdQuery, vocal } from "@/app/state/api"
import { CircularProgress } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"


export default function Page({params}:{params:{idAttachement:string}}){
    const {data:imageData,error:errorImage,isLoading:isLoadingImage} = useGetImageIdQuery({pId:params.idAttachement})
   // const {data:Vocal,error:errorVocal,isLoading:isLoadingVocal} = useGetVocalIdQuery()
    //const {data:Video,error:errorVideo,isLoading:isLoadingVideo} = useGetVideoQuery()
   
    const router = useRouter()
    
    const onclose=()=>{
        router.back()
    }

    if(isLoadingImage) return <CircularProgress/>

    if(errorImage) return <Error/>

    const imageSrc = URL.createObjectURL(new Blob([imageData as Blob],{type:"image/png"})) 
    return(
        <>
            <Modal name="attachement" isOpen={true} onClose={onclose}>
                <Image src={imageSrc} alt="Image" width={700} height={700}/>
            </Modal>
        </>
    )
}