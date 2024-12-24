"use client"
import { BoardViewPersonnel } from "@/app/(component)/Board/board";
import Error from "@/app/(component)/Error/Error";
import Field from "@/app/(component)/Field/Fields";
import TextAreaField from "@/app/(component)/Field/TextAreaField";
import Fileupload from "@/app/(component)/fileUpload/File";
import Header from "@/app/(component)/Header/Header";
import MultipleImageUpload from "@/app/(component)/ImageUpload/ImageUpload";
import { MyModal } from "@/app/(component)/Modal/Modal";
import Selects from "@/app/(component)/Select/Select";
import { personnel, ticket, useCreateAssignationMutation, useCreateAttachementMutation, useCreateRapportTicketMutation, useCreateTicketMutation, useDeleteTicketMutation, useGetAssignationQuery, useGetEnvironnementIdQuery, useGetEnvironnementQuery, useGetPersonnelByIdQuery, useGetPersonnelByPosteQuery, useGetPersonnelQuery, useGetQuartierQuery, useGetTicketQuery, useSendMessageMutation, useUpdateAttachementMutation, useUpdateDocumentMutation, useUpdateImageMutation, useUpdateTicketMutation, useUpdateTicketStatutMutation, useUpdateVideoMutation, useUpdateVocalMutation, vocal } from "@/app/state/api";
import { FileUpload } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { options } from "numeral";

export default function PageNiveau1({params,children}:{children:React.ReactNode,params:{id:string}}){
    const {data:personnel,error:errorPersonnel}=useGetPersonnelByIdQuery({personnelId:params.id})
    const {data:PersonnelPoste,error:errorPersonnelPoste,isLoading:isLoadingPersonnelPoste}=useGetPersonnelQuery()
    const [createattachment,{error:errorAttachement}]= useCreateAttachementMutation()
    const [updateAttachement,{error:errorUpdateAttachement}]=useUpdateAttachementMutation() 
    const{data:assignationData,error:errorAssignation,isLoading:loadingAssignation}=useGetAssignationQuery()
    const[createAssignation,{error:errorAssigna}]= useCreateAssignationMutation()
    const {data:environnement,error:errorEnvironnement,isLoading:isLoadingEnvironnement} = useGetEnvironnementQuery()
    const {data:ticketData,error:errorTicketData,isLoading:isLoadingTicket}= useGetTicketQuery()
    const [updateTicket,{error:errroUpdateTicket,isLoading:isLoadingUpdateTicket}]=useUpdateTicketMutation()
    const [updateStatutTicket,{error:errroUpdateStatutTicket,isLoading:isLoadingUTicket}]=useUpdateTicketStatutMutation()
    const [createTicket,{error:errorCreateTicket,isLoading:isLoadingCreateTicket}] = useCreateTicketMutation()
    const [updateImage,{error:errorUpdateImage}] = useUpdateImageMutation()
    const [updateDocument,{error:errorUpdateDocument}] = useUpdateDocumentMutation()
    const [updateVideo,{error:errorUpdateVideo}] = useUpdateVideoMutation()
    const [updateVocal,{error:errorUpdateVocal}] = useUpdateVocalMutation()
    const {data:quartierData,error:errorQuartier,isLoading:isLoadingQuartier}=useGetQuartierQuery()
    const [deleteTicket,{error:errorDeleteTicket}] = useDeleteTicketMutation()
    const [sendMesssage,{error:errorMessage,isLoading:isLoadingMessage}] = useSendMessageMutation()
    const [createRapport,{error:errorCreateRapport,isLoading:isLoadingCreateRapport}] = useCreateRapportTicketMutation()

    const [statuTicket,setStatutTicket]=useState({id:"",statut:""})
    const [open,setOpen]=useState(false)
    const [ticket,setTicket] = useState({
        description:"",
        nom:"",
        prenom:"",
        cin:"",
        sexe:"",
    })

    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(null));
    const [selectedDateModif, setSelectedDateModif] = React.useState<Dayjs | null>(dayjs(null));

    const [selectedImages, setSelectedImages] =  useState<File[]>([]);
    const [selectedVideo, setSelectedVideo] =  useState<File[]>([]);
    const [selectedDocument, setSelectedDocument] =  useState<File[]>([]);
    const [selectedAudio, setSelectedAudio] =  useState<File[]>([]);
   
    
const router = useRouter()


    ///error
    const [error, setError] = useState<string>("");
   

    //WizardForm
    const [WizardForm,setWizardForm] = useState<number>(1)

    const [value, setValue] = useState<string>("");

    const handleDateTimeChange = (newValue: Dayjs | null) => {
    setValue(newValue?.toISOString() as string);
  };

    const handleDateChange = (newDate: Dayjs | null) => {
      setSelectedDate(newDate);
      console.log('Date choisie:', newDate?.format('YYYY-MM-DD'));
    };
   
    const [ticketModif,setTicketModif] = useState({
        description:"",
        nom:"",
        prenom:"",
        cin:"",
        sexe:"",
        origine:"",
        envir:"",
        quartier:""
    })
    const origine = React.createRef<HTMLSelectElement>()
    const envi = React.createRef<HTMLSelectElement>()
    const commentaire = React.createRef<HTMLTextAreaElement>()
    const feedback = React.createRef<HTMLSelectElement>()
    const quartier = React.createRef<HTMLSelectElement>()
    const sexe = React.createRef<HTMLSelectElement>()
    
    const [errors, setErrors] = useState<Record<string, string>>({})
    const validateField = (name: string, value: React.SetStateAction<string>) => {
        const newErrors: Record<string, string> = { ...errors };
      
        if (name === "cin") {
          if (!/^\d{12}$/.test(value.toString())) {
            newErrors[name] = "Le CIN doit contenir exactement 12 numéro.";
          } else {
            delete newErrors[name];
          }
        }
      
        setErrors(newErrors);

      };
    const Change = (e: { target: { value: React.SetStateAction<string>,name:string,files:any}}) => {
        const { name, value } = e.target;
        setError("")
        validateField(name, value);
        setTicket((prevTicket) => ({
        ...prevTicket,
        [e.target.name]: e.target.value
      }));
    };
    
    const handleNext = (e:any) => {
        e.preventDefault()
            if (!ticket.description.trim()) {   
                setError("La description est obligatoire.");
              return;
            }
            else{
                setWizardForm(c=>c+1)
            }
    
    }

    const handleBack =(e:any) => {
        e.preventDefault()
        setWizardForm(c=>c-1)
    }
    
    const handleFileChange = (files: File[]) => {
        setSelectedImages(files)
       };
       
       const handleVideoChange = (files: File[]) => {
        setSelectedVideo(files)
       };

       const handleDocumentChange = (files: File[]) => {
        setSelectedDocument(files)
       };

       const handleAudioChange = (files: File[]) => {
        setSelectedAudio(files)
       };

    const handleClose=()=>{
        setTicketModif({
            description:"",
            nom:"",
            prenom:"",
            cin:"",
            sexe:"",
            origine:"",
            envir:"",
            quartier:""
        })

        setTicket({
            description:"",
            nom:"",
            prenom:"",
            cin:"",
            sexe:"",
        })
        
        setSelectedDate(null)
        setSelectedDateModif(null)
        setStatutTicket({id:"",statut:""})
        
        setWizardForm(1)
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const updateStatut=async(data:ticket,statut:string)=>{
            
        if(data.statut === "Créer" && statut === "Traitement"){
          try{
            const firstPoste = PersonnelPoste?.find(d=>d.poste.designation ==="DirecteurES")
                await createAssignation({
                ticket:data,
                personnel:firstPoste as personnel
                }).unwrap()
            
                await updateStatutTicket({
                    id:data.id,
                    statut:statut,
                    niveau:"2"
                }).unwrap()
            
                await sendMesssage({
                  getEmailFrom:personnel?.email,
                  emailTo:firstPoste?.email,
                  url:process.env.NEXT_PUBLIC_APP_BASE_URL+`/ticket/${firstPoste?.id}/niveau2?code=${data.code}`  
                })

                enqueueSnackbar("Envoi du ticket au niveau 2 avec succès",{
                    variant:"success"
                    })
            }catch(e){
                if(errroUpdateStatutTicket)
                    console.log(errroUpdateStatutTicket)
                if(errorAssigna)
                    console.log(errorAssigna)
                if(errorMessage)
                    console.log(errorMessage)

                enqueueSnackbar("Erreur lors de l'envoi du ticket au niveau 2",{
                    variant:"error"
                    })   
            }
    
                      
        }
        else if(data.statut === "Validation" &&(statut === "Retraitement" ||statut === "A clôturer")){
            setStatutTicket({id:data.id,statut:statut})
            setOpen(true)
        }
    }

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        add()
    }

    const handleValidation = async(e:any)=>{
        e.preventDefault()
        const ticketMod = ticketData?.find(d=>d.id == statuTicket.id)
        const assignation = assignationData?.find(d => d.personnel.id == params.id && d.ticket?.id == statuTicket.id)
        try{
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
                    dateCloture:value,
                    reference:ticketMod?.reference ,
                    feedback: statuTicket.statut === "Retraitement" ?feedback.current?.value:"NON",
                    commentairePLaignant:commentaire.current?.value,
                    DateRencotrePlaignant:value,
                    updatedAt:ticketMod?.updatedAt,
                    resolution:ticketMod?.resolution,
                    ressourceHumaine:ticketMod?.ressourceHumaine,
                    ressourceMatierelle:ticketMod?.ressourceMatierelle,
                    entitePrestataire:ticketMod?.entitePrestataire,
                    evaluationCout:ticketMod?.evaluationCout,
                    analyses:ticketMod?.analyses
                }).unwrap()

                await createRapport({
                    assignation:assignation,
                    dateTransmission:new Date().toISOString(),
                    dateReception:ticketMod?.updatedAt,
                }).unwrap();

                await sendMesssage({
                    getEmailFrom:personnel?.email,
                    emailTo:PersonnelPoste?.find(d=>d.poste.designation === "DirecteurES")?.email,
                    url:process.env.NEXT_PUBLIC_APP_BASE_URL+`/ticket/${PersonnelPoste?.find(d=>d.poste.designation === "DirecteurES")?.id}/niveau2?code=${ticketMod?.code}`  
                  }).unwrap() 
                  
                  enqueueSnackbar("Envoi du ticket au niveau 2 avec succès",{
                    variant:"success"
                    })

            }catch(e){
                if(errroUpdateTicket){
                    console.log(errroUpdateTicket)
                }
                console.log(e)

                enqueueSnackbar("Erreur de l'envoi du ticket au niveau 2",{
                    variant:"error"
                    })

            }
            handleClose()
    }

    const add = async () => {
        let a = true
        let audioErreur = true
        let documentErreur = true
        let videoErreur = true
        try {
            // Création du ticket
            const res = await createTicket({
                statut: "Créer",
                niveau: "1",
                description: ticket.description,
                categorieTicket: origine.current?.value,
                environnement: environnement?.find(d => d.designation === envi.current?.value),
                quartier: quartier.current?.value ,
                nom: ticket.nom,
                prenom: ticket.prenom,
                sexe: sexe.current?.value,
                cin: ticket.cin,
                dateNaissance: selectedDate?.toISOString()
            }).unwrap();
    
            // Création de l'assignation
            const assignation = await createAssignation({
                ticket: res,
                personnel: personnel
            }).unwrap();
    
            // Création de l'attachement
            const attachement = await createattachment({
                ticket: res  
            }).unwrap();
    
            // Vérification de l'image avant l'envoi
            if (selectedVideo.length > 0) {
                let data:any = null;
                const formData = new FormData();
                
                Array.from(selectedVideo).forEach((file) => {
                    formData.append("video", file);
                  });
                  formData.append("id",attachement.id)
                
                  axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/video`, formData, {
                    headers: {
                        "Authorization": "Bearer "+Cookies.get("token"),
                        "Content-Type": "multipart/form-data"
                    }
                }).then(s=>{
                    data = s.data
                }).catch(e=>console.error("Erreur lors de la création du document:"))
                
            }
            if (selectedAudio.length > 0) {
                let data:any = null;
                const formData = new FormData();
                
                Array.from(selectedAudio).forEach((file) => {
                    formData.append("audio", file);
                  });
                  formData.append("id",attachement.id)
                
                  axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vocal`, formData, {
                    headers: {
                        "Authorization": "Bearer "+Cookies.get("token"),
                        "Content-Type": "multipart/form-data"
                    }
                }).then(s=>{
                    data = s.data
                }).catch(e=>console.error("Erreur lors de la création du document:"))
               
            }
            if (selectedDocument.length > 0) {
                let data:any = null;
                const formData = new FormData();
                
                Array.from(selectedDocument).forEach((file) => {
                    formData.append("document", file);
                  });
                  formData.append("id",attachement.id)
                
                  axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/document`, formData, {
                    headers: {
                        "Authorization": "Bearer "+Cookies.get("token"),
                        "Content-Type": "multipart/form-data"
                    }
                }).then(s=>{
                    data = s.data
                }).catch(e=>console.error("Erreur lors de la création du document:"))
                
            }
        
            if (selectedImages.length > 0) {
                let data:any = null;
                const formData = new FormData();
                console.log("a,nan")
                Array.from(selectedImages).forEach((file) => {
                    formData.append("image", file);
                    console.log(file)
                  });
                  formData.append("id",attachement.id)
                
                axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/image`, formData, {
                    headers: {
                        "Authorization": "Bearer "+Cookies.get("token"),
                        "Content-Type": "multipart/form-data"
                    }
                }).then(s=>{
                    data = s.data
                    console.log(data)
                }).catch(e=>console.error("Erreur lors de la création de l'image:"))

            }
            handleSuccessNotification("Création du ticket avec succès")
        } catch (e) {
            // Gestion des erreurs individuelles pour chaque requête
            if (errorCreateTicket) {
                console.error("Erreur lors de la création du ticket:", errorCreateTicket);
            }
            if (errorAssigna) {
                console.error("Erreur lors de la création de l'assignation:", errorAssigna);
            }
            if (errorAttachement) {
                console.error("Erreur lors de la création de l'attachement:", errorAttachement);
            }
            if (errorUpdateAttachement) {
                console.error("Erreur lors de la mise à jour de l'image:", errorUpdateAttachement);
            }

            if (!audioErreur) {
                console.error("Erreur lors de la création de l'audio:");
            }
            if (!videoErreur) {
                console.error("Erreur lors de la création du vidéo");
            }
            if (!documentErreur) {
                console.error("Erreur lors de la création du document:");
            }
            if (!a) {
                console.error("Erreur lors de la création de l'image:");
            }
          
            if(errorUpdateImage)
                console.error("Erreur lors de la mise à jour de l'image",errorUpdateImage)

            if(errorUpdateVideo)
                console.error("Erreur lors de la mise à jour du video",errorUpdateVideo)
            if(errorUpdateVocal)
                console.error("Erreur lors de la mise à jour de l'audio",errorUpdateVocal)
            if(errorUpdateDocument)
                console.error("Erreur lors de la mise à jour du document",errorUpdateDocument)
            enqueueSnackbar("Erreur lors de l'envoi du ticket au niveau 2",{
                variant:"error"
                })
        }
        handleClose()
        enqueueSnackbar('Ajout avec succès',{
            variant:"success"
        })
    };
    
    const update=async()=>{
            const e = envi.current?.value !==null ? environnement?.find(d=>d.designation === envi.current?.value):
            environnement?.find(d=>d.designation === ticketModif.envir);
            console.log(ticketData?.find(d=>d.id == statuTicket.id)?.code)
            try{
                await updateTicket({
                    dateCreation:ticketData?.find(d=>d.id == statuTicket.id)?.dateCreation,
                    code:ticketData?.find(d=>d.id == statuTicket.id)?.code,
                    id:statuTicket.id,
                    statut: statuTicket.statut,
                    niveau: "1",
                    description: ticket.description ? ticket.description:ticketModif.description,
                    categorieTicket: origine.current?.value !==null ? origine.current?.value : ticketModif.origine,
                    environnement: e,
                    quartier: quartier.current?.value ? quartier.current?.value : ticketModif.quartier,
                    nom: ticket.nom ? ticket.nom : ticketModif.nom,
                    prenom: ticket.prenom ? ticket.prenom : ticketModif.prenom,
                    sexe: ticket.sexe ? ticket.sexe : ticketModif.sexe,
                    cin: ticket.cin ? ticket.cin : ticketModif.cin,
                    dateNaissance: selectedDate ? selectedDate.toISOString() : selectedDateModif?.toISOString(),
                    updatedAt:ticketData?.find(d=>d.id == statuTicket.id)?.updatedAt
                })
               
            }catch(e){
                if(errroUpdateTicket){
                    console.log(errroUpdateTicket)}
                    console.log(e)
                enqueueSnackbar("Erreur lors de l'envoi du ticket au niveau 2",{
                variant:"error"
                })
            }
    }


    const Action =(id:string)=>{
        if(id.endsWith("d")){
            console.log('dada')
            try{
                deleteTicket({ticketId:id.replace("d","")})
                enqueueSnackbar('Suppression avec succès',{
                variant:"success"
                })
            }catch(e){
                if(errorDeleteTicket) 
                    console.log((errorDeleteTicket as any).data)
                handleErrorNotification((errorDeleteTicket as any).data)
            }        
        }else{
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
        <div className="h-full w-full px-4 pb-8 xl:px-6 ">
        <SnackbarProvider/>
            <div className="pt-5">
                <Header name="Ticket" button={    
                    <MyModal button={true} isOpen={open} handleOpen={handleOpen} onClose={handleClose} name={""} >
                    {
                        statuTicket.statut !== "" &&(
                            <form className="mt-4 space-y-6" onSubmit={handleValidation}>
                                <TextAreaField  placeholder="commentaire" name="commentaire" ref={commentaire}/>
                                {
                                    statuTicket.statut === "Retraitement" &&(
                                        <Selects data={["Incompréhension des besoins","Solution inadéquate","Solution insuffisante"]} label="feedback" name="feedback" ref={feedback}/>
                                    )
                                }
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={[
                                        'DateTimePicker',
                                        'MobileDateTimePicker',
                                        'DesktopDateTimePicker',
                                        'StaticDateTimePicker',
                                        ]}
                                    > 
                                        <DemoItem label="Date de rencontre avec le plaignant ">
                                        <StaticDateTimePicker shouldDisableDate={(date) => dayjs(date).isAfter(dayjs()) } onChange={handleDateTimeChange}  defaultValue={dayjs('2022-04-17T15:30')} />
                                        </DemoItem>
                                    </DemoContainer>
                                  </LocalizationProvider>
                                <button type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                               bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 
                                 focus:ring-blue-600 focus-offset-2 
                                `}>
                               Confirmer
                                </button>
                            </form>
                        )
                    }{
                        statuTicket.statut === "" &&(
                            <div className="flex flex-col   bg-gray-50 md:flex-row">
                            <div className="relative  md:flex-1 md:min-w-[300px] md:p-12 md:flex-col md:gap-0 space-y-10 md:space-y-20">
                                <div className="text-sm font-extrabold text-black-500  pl-10 text-center scale-110 "><span className="text-blue-600 font-extrabold text-xl">Création</span> du ticket</div>
                                    <div className="flex flex-col md:flex-row sm:ml-10 md:ml-0">
                                        <div className="flex flex-row space-x-20 md:space-x-0 md:space-y-10 md:flex-col ">
                                            <span className={`after:content-[''] bg-blue-primary after:absolute text-white after:bg-blue-primary relative after:transition-all after:ease-in-out after:duration-500 after:left-10 md:after:top-10 md:after:left-4 w-[40px] h-[40px] flex items-center mr-4 justify-center border-4 border-solid  rounded-full  
                                             ${WizardForm > 1 ? " md:after:w-[2px] md:after:h-16   after:w-[106px] after:h-[2px]":"after:w-[0px] after:h-0"}`} >1
                                            </span>
                                            <span className={`md:after:top-10 after:absolute after:left-10 md:after:left-4 after:bg-blue-primary ${WizardForm >= 2 ? "bg-blue-primary":"bg-gray-300"} after:content-[''] after:transition-all after:ease-in-out after:duration-500 text-white relative  w-[40px] h-[40px] flex items-center mr-4 justify-center border-4  border-solid  rounded-full  
                                            ${WizardForm >2 ? "md:after:w-[2px] md:after:h-16 after:w-[106px] after:h-[2px]    ":"after:w-[0px]  after:h-0"}`} >2
                                            </span>
                                            <span className={`${WizardForm >2 ? "bg-blue-primary":"bg-gray-300"} text-white relative w-[40px] h-[40px]  flex items-center mr-4 justify-center border-4 border-solid  rounded-full`}>3
                                        </span>        
                                        </div>
                                        <div className=" flex flex-row space-x-10 md:space-x-1 md:space-y-10 mt-3 md:flex-col">
                                            <div><p>Information du plainte <br /><span className="text-sm text-black-100">25x</span></p></div>
                                            <div><p>Attachement <br /><span className="text-sm text-black-100">25x</span></p></div>
                                            <div><p>Information personnel du plaignant <br /><span className="text-sm text-black-100">25x</span></p></div>
                                        </div>
                                    </div>
                                
                            </div>
                                <form className="w-full p-3 justify-between bg-white md:h-[575px]  md:pt-10 md:p-12" onSubmit={handleSubmit}>                                   
                                              <div className={`space-y-5 ${WizardForm != 1 ?"hidden" :""} mx-auto mb-72`}>
                                                <p className="font-extrabold text-xl">Information du plainte </p>
                                                <TextAreaField errorText={error} error={!!error}  name="description" onChange={Change} placeholder="description" defaultValue= {ticketModif.description ? ticketModif.description:""}/>
                                                <Selects className="w-[203px]" data={["Constat","Plainte","Requête","Suggestion","Rumeur"]} label="origine Ticket"  name="origineTicket" ref={origine} 
                                                defaultValue={ticketModif.origine ? ticketModif.origine:"Constat"}/>
                                                <Selects className="w-[203px]" data={environnement?.map(d=>d.designation) as string[]} label="environnement"  name="origineTicket" defaultValue={ticketModif.envir ? ticketModif.envir:environnement?.[0].designation} ref={envi}/>
                                            </div>
                                            <div className={`space-y-5 ${WizardForm != 2 ?"hidden" :""} animate-fadeIn mb-36`}>
                                                <p className="font-extrabold text-xl">Attachement</p>
                                                    <MultipleImageUpload onFilesChange={handleFileChange}/>
                                                    <Fileupload name="Document" onChange={handleDocumentChange}/>
                                                    <Fileupload name="Audio" onChange={handleAudioChange}/>
                                                    <Fileupload name="Video" onChange={handleVideoChange}/>   
                                                </div>
                                            <div className={`space-y-5 flex flex-col ${WizardForm != 3 ?"hidden" :""} animate-fadeIn`} >
                                                <p className="font-extrabold text-xl">Information du plaignant</p>
                                                <Field required error={!!errors.nom} errorText={errors.nom} type="text" name="nom" defaultValue={ticketModif.nom ? ticketModif.nom : ""} onChange={Change} placeholder="nom du plaignant"/>
                                                <Field  required error={!!errors.prenom} errorText={errors.prenom} type="text" name="prenom" defaultValue={ticketModif.prenom ? ticketModif.prenom : ""} onChange={Change} placeholder="prenom du plaignant"/>
                                                <Selects data={["Masculin","Féminin"]} label="Sexe"  name="sexe" ref={sexe} defaultValue={"Masculin"}/>
                                                <Field required error={!!errors.cin} errorText={errors.cin} type="text" name="cin" defaultValue={ticketModif.cin ? ticketModif.cin : ""} placeholder="cin" onChange={Change}/>
                                                <Selects data={quartierData?.map(d=>d.designation )as string[]} label="quartier" name="quartier" defaultValue={quartierData?.findLast(d=>d)?.designation as string} ref={quartier}/>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker']}>
                                                        <DatePicker
                                                        name="dateNaissance"
                                                        label="Date de Naissance"
                                                        defaultValue={selectedDateModif}
                                                        onChange={handleDateChange}  
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </div>
                                            <div className="flex flex-row space-x-2 ">
                                                    <button disabled={WizardForm == 1} onClick={handleBack} className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                                                    ${WizardForm == 1 ?"bg-gray-400" :"bg-blue-primary"} px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 `}>Retour</button>
                                                    <button disabled={WizardForm == 3}  onClick={handleNext}  className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                                                    ${WizardForm == 3 ?"bg-gray-400" :"bg-blue-primary"} px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 `}>Suivant</button>
                                                    <button disabled={WizardForm != 3 || !!errors.nom} type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                                                    ${WizardForm != 3 || !!errors.nom || !!errors.prenom || !!errors.cin || !!errors.sexe ?"bg-gray-400" :"bg-blue-primary"} px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 
                                                `}>
                                                    {"Ajouter"}
                                                    </button>
                                            </div>
                                </form>
                    </div>
                        )
                    }
                        
                    
                </MyModal>}
                 isSmallText/>
            </div>
            {
               errorAssignation ? <Error/>  :  loadingAssignation? <CircularProgress size={15} sx={{margin:"auto"}}/> :
               <BoardViewPersonnel data={assignationData?.filter(d=>d.personnel?.id == params.id).map(d=>d.ticket) as ticket[]} onClick={Action} update={updateStatut} role="agent"  />
            } 
            
            {children}    
        </div> 
        </>
    )
}