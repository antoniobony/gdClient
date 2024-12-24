import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userType } from "./authState";
import Cookies from 'js-cookie';
import { useSelector } from "react-redux";


export type plaignant={
    id:string,
    nom:string,
    dateNaissance:string,
    sexe:string,
    cin:string,
    phone:string,
    prenom:string,
    email:string,
    role:string,
    reclamations:reclamation[],
    adresse:string
}

export type responseSignIn = {
        id:string,
        role:string,
        token:string,
        poste?:poste,
        email:string   
}
export type response={
    data:{
      message:string
    }
  }
export type statutTicket={
    id:string,
    niveau:string,
    statut:string
}

export type changePassword={
    password:string,
    newPassword:string,
    confirmNewPassword:string
}

export type personnel={
    id:string,
    nom:string,
    dateNaissance:string,
    sexe:string,
    cin:string,
    phone:string,
    prenom:string,
    email:string,
    role:string,
    poste:poste
    assignations:assignation[],
    reclamations:reclamation[],
    adresse:string
}

export type userRegister={
    nom:string,
    dateNaissance:string,
    sexe:string,
    cin:string,
    phone:string,
    prenom:string,
    email:string,
    role:string,
    adresse:string,
    poste?:string|null,
    password?:string
}
export type assignation={
    id:string,
        numTicket?:string,
        dateAssignation?:string,
        ticket?:ticket,
        personnel:personnel,
        rapportTickets:rapportTicket[]
    }

export type vocal={
    id:string,
    designation:string,
    attachement?:attachement;
    imageData?:any;
    type:string;
    documentData?:string
}


export type attachement={
    id:string,
    images?:vocal[];
    videos?:vocal[],
    vocals?:vocal[],
    documents?:vocal[],
    ticket:ticket,

}

export type quartier = {
    id:string,
    designation:string,
    commune:{
        id:string,
        designation:string
    }
}

export type ticket={
        id:string,
        niveau:string | number,
       description:string,
       code:string,
       reference:string,
       dateCreation:any,
       dateCloture?:string,
       ressourceHumaine:string,
       evaluationCout:string;
       resolution:string,
       analyses:string,
       entitePrestataire:string,
       ressourceMatierelle:string,
       commentairePLaignant:string,
       categorieTicket:string,
       statut:string,
       feedback:string,
       DateRencotrePlaignant:string,
       nom:string,
       prenom:string,
       cin:string,
       quartier:string,
       sexe:string,
       dateNaissance:string,
       assignations:assignation[],
       environnement:environnement,
       attachements:attachement[],
       updatedAt?:string,
       createdAt?:string
}

export type reclamation={
    id:string;
    dateCreation:string;
    description:string;
    statut:string;
    premierRencontre?:string;
    plaignant:{id:string,
        nom:string,
        dateNaissance:any,
        sexe:string,
        cin:string,
        phone:string,
        prenom:string,
        email:string,
        role:string,
        quartier?:quartier
    }
        personnel:{id:string,
            nom:string,
            dateNasissance:any,
            sexe:string,
            cin:string,
            phone:string,
            prenom:string,
            email:string,
            role:string,}

}

export type environnement={
    id: string | number;
    designation: string; 
    code:string;
    categorie:{
        id:string,
        designation:string
      }
  }

  export type direction = {
    id:string,
    code:string,
    designation:string
  }

export type rapportTicket={
    id:string;
    dateTransmission:string;
    dateReception:string;
    consultation?:string;
    observation?:string;
    instruction?:string;
    assignation:assignation
}

export type MessageTicket ={
    emailTo:string,
    getEmailFrom:string
    url:string
}


export type poste ={
    id:string;
    code:string;
    designation:string;
    departement?:direction;
    direction?:direction;
    updatedAt?:string;
    createdAt?:string;
}



export type commune = {
    id:string;
    designation:string;
    quartier?:quartier[];
}


export type nombreTicketByPersonnel={
    nom:string;
    nombreTicket:string;
}

export type nombreTicketByCategorie={
    categorieTicket:string;
    nombreTicket:string;
}

export type nombreTicketDepartementOrDirection={
    nombreTicket:string,
    designation:string,
}

export type nombreTicketByEnvironnement={
    nombreTicket:string,
    designation:string,
}

export type nombreQuartier={
    quartier:string;
    commune:string;
    nombreTicket:string;
}


export type tableTicket={
    code:string;
    quartier:string;
    commune:string;
    dateCreation:string;
    plaignant:string;
    environnement:string;
    description:string;
    resolution:string;
    niveau:string;
    personnel:string;
    statut:string;
    dateCloture:string;
    categorie:string;
    cout:string;
}

export const api = createApi({
baseQuery:fetchBaseQuery({
baseUrl:process.env.NEXT_PUBLIC_API_BASE_URL,
prepareHeaders:(headers)=>{
    headers.set("Authorization",`Bearer ${Cookies.get('token')}`)
    headers.set("Content-Type","application/json")
    return headers;
    }
}),
reducerPath:"api",
tagTypes:["Reclamation","Plaignant","Personnel","Ticket","Assignation","Environnement"
    ,"Attachement","Image","Vocal","Video","Document","RapportTicket","Direction","Departement","Poste","Quartier","Commune","Admin","SuperAdmin"
],
endpoints:(build)=>({
    //RECLAMATION
    getReclamation: build.query<reclamation[],void>({
        query:() => ({
            url:"reclamation",
        }),
        providesTags:  ["Reclamation"],
    }),
    getReclamationById: build.query<reclamation,{reclamationId:string | number}>({
        query:({reclamationId}) => ({
            url:`reclamation/${reclamationId}`,
        
        }),
        providesTags:  ["Reclamation"], 
    }),
    createReclamation : build.mutation<reclamation,Partial<reclamation>>({
        query: (reclamation) => ({
            url: "reclamation",
            method: "POST",
            body: reclamation,
        }),
        invalidatesTags:["Reclamation","Plaignant"]
    }),
    updateReclamation : build.mutation<reclamation,Partial<reclamation>>({
        query: (reclamation) => ({
            url: `reclamation/${reclamation.id}`,
            method: "PUT",
            body: reclamation,
        }),
        invalidatesTags:["Reclamation","Plaignant"]
    }),
    deleteReclamation : build.mutation<void,{reclamationId:string | number}>({
        query: ({reclamationId}) => ({
            url: `reclamation/${reclamationId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Reclamation","Plaignant"]
    }),

    //PLAIGNANT
    getPlaignant: build.query<plaignant[],void>({
        query:() => ({
            url:"plaignant",
        }),
        providesTags:  ["Plaignant"],
    }),
    getPlaignantById: build.query<plaignant,{plaignantId:string | number}>({
        query:({plaignantId}) => ({
            url:`plaignant/${plaignantId}`,
        }),
        providesTags:  ["Plaignant"], 
    }),
    createPlaignant : build.mutation<plaignant,Partial<plaignant>>({
        query: (plaignant) => ({
            url: "plaignant",
            method: "POST",
            body: plaignant,
        }),
        invalidatesTags:["Plaignant"]
    }),
    updatePlaignant : build.mutation<plaignant,Partial<plaignant>>({
        query: (plaignant) => ({
            url: `plaignant/${plaignant.id}`,
            method: "PUT",
            body: plaignant,
        }),
        invalidatesTags:["Plaignant"]
    }),
    deletePlaignant : build.mutation<void,{plaignantId:string | number}>({
        query: ({plaignantId}) => ({
            url: `plaignant/${plaignantId}`,
            method: "DELETE"
        }),
        invalidatesTags:["Plaignant"]
    }),
    getAdminById: build.query<plaignant,{plaignantId:string | number}>({
        query:({plaignantId}) => ({
            url:`admin/${plaignantId}`,
        }),
        providesTags:["Admin"] 
    }),
    getAdmin: build.query<plaignant[],void>({
        query:() => ({
            url:`admin`,
        }),
        providesTags:["Admin"] 
    }),
    updateAdmin : build.mutation<plaignant,Partial<plaignant>>({
        query: (plaignant) => ({
            url: `admin/${plaignant.id}`,
            method: "PUT",
            body: plaignant,
        }),
        invalidatesTags:["Admin"]
    }),
    getSuperAdminById: build.query<plaignant,{plaignantId:string | number}>({
        query:({plaignantId}) => ({
            url:`superAdmin/${plaignantId}`,
        }), 
        providesTags:["SuperAdmin"] 
    }),
    updateSuperAdmin : build.mutation<plaignant,Partial<plaignant>>({
        query: (plaignant) => ({
            url: `superAdmin/${plaignant.id}`,
            method: "PUT",
            body: plaignant,
        }),
        invalidatesTags:["SuperAdmin"]
    }),
    deleteAdmin : build.mutation<void,{personnelId:string | number}>({
        query: ({personnelId}) => ({
            url: `admin/${personnelId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Reclamation","Assignation"]
    }),
    deleteSuperAdmin : build.mutation<void,{personnelId:string | number}>({
        query: ({personnelId}) => ({
            url: `superAdmin/${personnelId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Reclamation","Assignation"]
    }),
      //PERSONNEL
      getPersonnel: build.query<personnel[],void>({
        query:() => ({
            url:"personnel",
        }),
        providesTags:  ["Personnel"],

    }),
    getPersonnelById: build.query<personnel,{personnelId:string | number}>({
        query:({personnelId}) => ({
            url:`personnel/${personnelId}`,
        }),
        providesTags:  ["Personnel"], 
    }),
    getPersonnelByPoste:build.query<personnel[],{personnelPoste:string}>({
        query:({personnelPoste}) => ({
            url:`personnel/poste/${personnelPoste}`,
        }),
        providesTags:  ["Personnel"], 
    }),
    getPersonnelByDirection:build.query<personnel,{personnelPoste:string,PersonnelDirection:string}>({
        query:({personnelPoste,PersonnelDirection}) => ({
            url:`personnel/poste/${personnelPoste}/direction/${PersonnelDirection}`,
        }),
        providesTags:  ["Personnel"], 
    }),
    getPersonnelByDepartement:build.query<personnel,{personnelPoste:string,PersonnelDepartement:string}>({
        query:({personnelPoste,PersonnelDepartement}) => ({
            url:`personnel/poste/${personnelPoste}/departement/${PersonnelDepartement}`,
        }),
        providesTags:  ["Personnel"], 
    }),
    getPersonnelNombre:build.query<String,void>({
        query:()=>({
            url:"personnel/count"
        })
    }),
    createPersonnel : build.mutation<personnel,Partial<personnel>>({
        query: (personnel) => ({
            url: "personnel",
            method: "POST",
            body: personnel,
        }),
        invalidatesTags:["Personnel","Reclamation","Ticket"]
    }),
    updatePersonnel : build.mutation<personnel,Partial<personnel>>({
        query: (personnel) => ({
            url: `personnel/${personnel.id}`,
            method: "PUT",
            body: personnel,
        }),
        invalidatesTags:["Personnel","Reclamation","Assignation"]
    }),
    updatePersonnelInformation : build.mutation<personnel,Partial<personnel>>({
        query: (personnel) => ({
            url: `personnel/infomation/${personnel.id}`,
            method: "PUT",
            body: personnel,
        }),
        invalidatesTags:["Personnel","Reclamation","Assignation"]
    }),
    deletePersonnel : build.mutation<void,{personnelId:string | number}>({
        query: ({personnelId}) => ({
            url: `personnel/${personnelId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Reclamation","Assignation"]
    }),
    ///TICKET
    getTicket: build.query<ticket[],void>({
        query:() => ({
            url:"ticket",
        }),
        providesTags:  ["Ticket"],

    }),
    getTicketId: build.query<ticket,{pId:string | number}>({
        query:({pId}) => ({
            url:`ticket/${pId}`,
            
        }),
        providesTags:  ["Ticket"], 
    }),
    sendMessage:build.mutation<void,Partial<MessageTicket>>({
        query: (t) => ({
            url: "ticket/sendMessage",
            method: "POST",
            body: t,
            
        }),
        invalidatesTags:["Personnel","Ticket","Assignation"]
    }),
    createTicket : build.mutation<ticket,Partial<ticket>>({
        query: (t) => ({
            url: "ticket",
            method: "POST",
            body: t,
            
        }),
        invalidatesTags:["Personnel","Ticket","Assignation"]
    }),
    updateTicket : build.mutation<ticket,Partial<ticket>>({
        query: (ticket) => ({
            url: `ticket/${ticket.id}`,
            method: "PUT",
            body: ticket,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation"]
    }),
    updateTicketStatut : build.mutation<void,Partial<statutTicket>>({
        query: (statutTicket) => ({
            url: `ticket/statut/${statutTicket.id}`,
            method: "PUT",
            body: statutTicket
        }),
        invalidatesTags:["Personnel","Ticket","Assignation"]
    }),
    deleteTicket : build.mutation<void,{ticketId:string | number}>({
        query: ({ticketId}) => ({
            url: `ticket/${ticketId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Ticket","Assignation"]
    }),
    ///Assignation
    getAssignation: build.query<assignation[],void>({
        query:() => ({
            url:"assignation",
        }),
        providesTags:  ["Assignation"],
    }),
    getAssignationId: build.query<assignation,{pId:string | number}>({
        query:({pId}) => ({
            url:`assignation/${pId}`,
            
        }),
        providesTags:  ["Assignation"], 
    }),
    createAssignation : build.mutation<assignation,Partial<assignation>>({
        query: (t) => ({
            url: "assignation",
            method: "POST",
            body: t,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation"]
    }),
    updateAssignation : build.mutation<assignation,Partial<assignation>>({
        query: (assignations) => ({
            url: `assignation/${assignations.id}`,
            method: "PUT",
            body: assignations,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation"]
    }),
    deleteAssignation : build.mutation<void,{assignationId:string | number}>({
        query: ({assignationId}) => ({
            url: `assignation/${assignationId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Ticket","Assignation"]
    }),
    //Environnement
    getEnvironnement: build.query<environnement[],void>({
        query:() => ({
            url:"environnement",
        }),
        providesTags:  ["Environnement"],
    }),
    getEnvironnementId: build.query<environnement,{pId:string | number}>({
        query:({pId}) => ({
            url:`environnnement/${pId}`,
        }),
        providesTags:  ["Environnement"], 
    }),
    createEnvironnement : build.mutation<environnement,Partial<environnement>>({
        query: (t) => ({
            url: "environnement",
            method: "POST",
            body: t,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement"]
    }),
    updateEnvironnement : build.mutation<environnement,Partial<environnement>>({
        query: (environnement) => ({
            url: `environnement/${environnement.id}`,
            method: "PUT",
            body: environnement,
            
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement"]
    }),
    deleteEnvironnement : build.mutation<void,{environnementId:string | number}>({
        query: ({environnementId}) => ({
            url: `environnement/${environnementId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement"]
    }),
    getAttachement: build.query<attachement[],void>({
        query:() => ({
            url:"attachement",
        }),
        providesTags:  ["Attachement"],
    }),
    getAttachementId: build.query<attachement,{pId:string | number}>({
        query:({pId}) => ({
            url:`attachement/${pId}`,
        }),
        providesTags:  ["Attachement"], 
    }),
    createAttachement : build.mutation<attachement,Partial<attachement>>({
        query: (t) => ({
            url: "attachement",
            method: "POST",
            body: t,
           
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Attachement"]
    }),
    updateAttachement : build.mutation<attachement,Partial<attachement>>({
        query: (attachement) => ({
            url: `attachement/${attachement.id}`,
            method: "PUT",
            body: attachement,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Attachement"]
    }),
    deleteAttachement : build.mutation<void,{attachementId:string | number}>({
        query: ({attachementId}) => ({
            url: `attachement/${attachementId}`,
            method: "DELETE",
           
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Attachement"]
    })
    ,////////
    getImage: build.query<vocal[],void>({
        query:() => ({
            url:"image",
        }),
        providesTags:  ["Image"],
    }),
    getImageId: build.query<Blob,{pId:string | number}>({
        query:({pId}) => ({
            url:`image/${pId}`,
        responseHandler:(response) => response.blob(),
    }),
        providesTags:  ["Image"],
    }),
    createImage : build.mutation<vocal,{image:any}>({
        query: ({image}) => 
        {
            return {
            url: `image`,
            method: "POST",
            body:image,
            
        }
    },
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Image"]
    }),
    updateImage : build.mutation<vocal,Partial<vocal>>({
        query: (image) => ({
            url: `image/${image.id}`,
            method: "PUT",
            body: image,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Image"]
    }),
    deleteImage : build.mutation<void,{imageId:string | number}>({
        query: ({imageId}) => ({
            url: `image/${imageId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Image"]
    }),
    ////vocal
    getVocal: build.query<vocal[],void>({
        query:() => ({
            url:"vocal",
        }),
        providesTags:  ["Vocal"],
    }),
    getVocalId: build.query<vocal,{pId:string | number}>({
        query:({pId}) => ({
            url:`vocal/${pId}`,
        }),
        providesTags:  ["Vocal"], 
    }),
    createVocal : build.mutation<vocal,{pId:any}>({
        query: ({pId}) => {
            const formData = new FormData()
            formData.append("vocal",pId)
            return{
            url: `vocal`,
            method: "POST",
            body:formData,
        }},
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Vocal"]
    }),
    updateVocal : build.mutation<vocal,Partial<vocal>>({
        query: (vocal) => ({
            url: `vocal/${vocal.id}`,
            method: "PUT",
            body: vocal,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Vocal"]
    }),
    deleteVocal : build.mutation<void,{vocalId:string | number}>({
        query: ({vocalId}) => ({
            url: `vocal/${vocalId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Vocal"]
    }),
    getVideo: build.query<vocal[],void>({
        query:() => ({
            url:"video",
        }),
        providesTags:  ["Video"],
    }),
    getVideoId: build.query<vocal,{pId:string | number}>({
        query:({pId}) => ({url:`video/${pId}`,
        
        }),
        providesTags:  ["Video"], 
    }),
    createVideo : build.mutation<vocal,{pId:any}>({
        query: ({pId}) => {
            const formData = new FormData()
            formData.append("video",pId)
            return{
            url: `video`,
            method: "POST",
            body: formData,
        }},
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Video"]
    }),
    updateVideo : build.mutation<vocal,Partial<vocal>>({
        query: (video) => ({
            url: `video/${video.id}`,
            method: "PUT",
            body: video,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Video"]
    }),
    deleteVideo : build.mutation<void,{videoId:string | number}>({
        query: ({videoId}) => ({
            url: `video/${videoId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Video"]
    }),
    getDocument: build.query<vocal[],void>({
        query:() => ({
            url:"document",
            }),
        providesTags:  ["Document"],
    }),
    getDocumentId: build.query<vocal,{pId:string | number}>({
        query:({pId}) => ({
            url:`document/${pId}`,
        }),
        providesTags:  ["Document"], 
    }),
    createDocument : build.mutation<vocal,{document:any}>({
        query: ({document}) => {
            const formData = new FormData()
            formData.append("document",document)
            return{
            url: `document'`,
            method: "POST",
            body:formData,
        }},
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Document"]
    }),
    updateDocument : build.mutation<vocal,Partial<vocal>>({
        query: (document) => ({
            url: `document/${document.id}`,
            method: "PUT",
            body: document,
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Document"]
    }),
    deleteDocument : build.mutation<void,{documentId:string | number}>({
        query: ({documentId}) => ({
            url: `document/${documentId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Personnel","Ticket","Assignation","Environnement","Document"]
    }),
    //RapportTicket

    getRapportTicket: build.query<rapportTicket[],void>({
        query:() => ({
            url:"rapportTicket",
        }),
        providesTags:  ["RapportTicket"],
    }),
    getRapportTicketyId: build.query<rapportTicket,{RapportTicketId:string | number}>({
        query:({RapportTicketId}) => ({
            url:`rapportTicket/${RapportTicketId}`,
        }),
        providesTags:  ["RapportTicket"], 
    }),
    createRapportTicket : build.mutation<rapportTicket,Partial<rapportTicket>>({
        query: (rapportTicket) => ({
            url: "rapportTicket",
            method: "POST",
            body: rapportTicket,
        }),
        invalidatesTags:["RapportTicket","Ticket","Personnel","Assignation"]
    }),
    updateRapportTicket : build.mutation<rapportTicket,Partial<rapportTicket>>({
        query: (RapportTicket) => ({
            url: `rapportTicket/${RapportTicket.id}`,
            method: "PUT",
            body: RapportTicket,

        }),
        invalidatesTags:["RapportTicket","Assignation","Ticket","Personnel"]
    }),
    deleteRapportTicket : build.mutation<void,{RapportTicketId:string | number}>({
        query: ({RapportTicketId}) => ({
            url: `rapportTicket/${RapportTicketId}`,
            method: "DELETE",
        }),
        invalidatesTags:["RapportTicket","Ticket","Personnel","Assignation"]
    }),

    //////Direction

    getDirection: build.query<direction[],void>({
        query:() => ({
            url:"direction",
        }),
        providesTags:  ["Direction"],
    }),
    getDirectionId: build.query<direction,{DirectionId:string | number}>({
        query:({DirectionId}) => ({
            url:`direction/${DirectionId}`,
        }),
        providesTags:  ["Direction"], 
    }),
    createDirection : build.mutation<direction,Partial<direction>>({
        query: (rapportTicket) => ({
            url: "direction",
            method: "POST",
            body: rapportTicket,
        }),
        invalidatesTags:["Direction","Ticket","Personnel","Assignation"]
    }),
    updateDirection : build.mutation<direction,Partial<direction>>({
        query: (RapportTicket) => ({
            url: `direction/${RapportTicket.id}`,
            method: "PUT",
            body: RapportTicket,

        }),
        invalidatesTags:["Direction","Assignation","Ticket","Personnel"]
    }),
    deleteDirection : build.mutation<void,{RapportTicketId:string | number}>({
        query: ({RapportTicketId}) => ({
            url: `direction/${RapportTicketId}`,
            method: "DELETE",
        }),
        invalidatesTags:["Direction","Ticket","Personnel","Assignation"]
    }),

    ////Departement
    
getDepartement: build.query<direction[],void>({
    query:() => ({
        url:"departement",
    }),
    providesTags:  ["Departement"],
}),
getDepartementId: build.query<direction,{DepartementId:string | number}>({
    query:({DepartementId}) => ({
        url:`departement/${DepartementId}`,
    }),
    providesTags:  ["Departement"], 
}),
createDepartement : build.mutation<direction,Partial<direction>>({
    query: (rapportTicket) => ({
        url: "departement",
        method: "POST",
        body: rapportTicket,
    }),
    invalidatesTags:["Departement","Ticket","Personnel","Assignation"]
}),
updateDepartement : build.mutation<direction,Partial<direction>>({
    query: (RapportTicket) => ({
        url: `departement/${RapportTicket.id}`,
        method: "PUT",
        body: RapportTicket,

    }),
    invalidatesTags:["Departement","Assignation","Ticket","Personnel"]
}),
deleteDepartement : build.mutation<void,{RapportTicketId:string | number}>({
    query: ({RapportTicketId}) => ({
        url: `departement/${RapportTicketId}`,
        method: "DELETE",
    }),
    invalidatesTags:["Departement","Ticket","Personnel","Assignation"]
})
,    ////Poste
    
getPoste: build.query<poste[],void>({
    query:() => ({
        url:"poste",
    }),
    providesTags:  ["Poste"],
}),
getPosteId: build.query<poste,{DepartementId:string | number}>({
    query:({DepartementId}) => ({
        url:`poste/${DepartementId}`,
    }),
    providesTags:  ["Poste"], 
}),
createPoste : build.mutation<poste,Partial<poste>>({
    query: (rapportTicket) => ({
        url: "poste",
        method: "POST",
        body: rapportTicket,
    }),
    invalidatesTags:["Poste","Ticket","Personnel","Assignation"]
}),
updatePoste : build.mutation<poste,Partial<poste>>({
    query: (RapportTicket) => ({
        url: `poste/${RapportTicket.id}`,
        method: "PUT",
        body: RapportTicket,

    }),
    invalidatesTags:["Poste","Assignation","Ticket","Personnel"]
}),
deletePoste : build.mutation<void,{RapportTicketId:string | number}>({
    query: ({RapportTicketId}) => ({
        url: `poste/${RapportTicketId}`,
        method: "DELETE",
    }),
    invalidatesTags:["Poste","Ticket","Personnel","Assignation"]
}),
getQuartier: build.query<quartier[],void>({
    query:() => ({
        url:"quartier",
    }),
    providesTags:  ["Quartier"],
}),
getQuartierId: build.query<quartier,{DepartementId:string | number}>({
    query:({DepartementId}) => ({
        url:`quartier/${DepartementId}`,
    }),
    providesTags:  ["Quartier"], 
}),
createQuartier : build.mutation<quartier,Partial<quartier>>({
    query: (rapportTicket) => ({
        url: "quartier",
        method: "POST",
        body: rapportTicket,
    }),
    invalidatesTags:["Quartier","Commune","Ticket","Personnel","Assignation"]
}),
updateQuartier : build.mutation<quartier,Partial<quartier>>({
    query: (RapportTicket) => ({
        url: `quartier/${RapportTicket.id}`,
        method: "PUT",
        body: RapportTicket,

    }),
    invalidatesTags:["Quartier","Commune","Assignation","Ticket","Personnel"]
}),
deleteQuartier : build.mutation<void,{RapportTicketId:string | number}>({
    query: ({RapportTicketId}) => ({
        url: `quartier/${RapportTicketId}`,
        method: "DELETE",
    }),
    invalidatesTags:["Quartier","Commune","Ticket","Personnel","Assignation"]
}),
getCommune: build.query<commune[],void>({
    query:() => ({
        url:"commune",
    }),
    providesTags:  ["Commune"],
}),
getCommuneId: build.query<commune,{DepartementId:string | number}>({
    query:({DepartementId}) => ({
        url:`commune/${DepartementId}`,
    }),
    providesTags:  ["Commune"], 
}),
createCommune : build.mutation<commune,Partial<commune>>({
    query: (rapportTicket) => ({
        url: "commune",
        method: "POST",
        body: rapportTicket,
    }),
    invalidatesTags:["Commune","Quartier","Ticket","Personnel","Assignation"]
}),
updateCommune : build.mutation<commune,Partial<commune>>({
    query: (RapportTicket) => ({
        url: `commune/${RapportTicket.id}`,
        method: "PUT",
        body: RapportTicket,

    }),
    invalidatesTags:["Commune","Quartier","Assignation","Ticket","Personnel"]
}),
deleteCommune : build.mutation<void,{RapportTicketId:string | number}>({
    query: ({RapportTicketId}) => ({
        url: `commune/${RapportTicketId}`,
        method: "DELETE",
    }),
    invalidatesTags:["Commune","Quartier","Ticket","Personnel","Assignation"]
}),
changePassword:build.mutation<void,Partial<changePassword>>({
    query: (changePassword) => ({
        url: "changePassword",
        method: "POST",
        body: changePassword,
    })
}),
getNombreTicketByPersonnel:build.query<nombreTicketByPersonnel[],void>({
    query:()=>({
        url:"ticket/nombreTicketPersonnel"
    })
}),
getNombreTicketByCategorie:build.query<nombreTicketDepartementOrDirection[],void>({
    query:()=>({
        url:"ticket/nombreTicketCategorie"
    })
}),
getNombreTicketByDepartement:build.query<nombreTicketDepartementOrDirection[],void>({
    query:()=>({
        url:"ticket/nombreTicketDepartement"
    })
}),
getNombreTicketByDirection:build.query<nombreTicketDepartementOrDirection[],void>({
    query:()=>({
        url:"ticket/nombreTicketDirection"
    })
}),
getNombreTicketByMonth:build.query<nombreTicketDepartementOrDirection[],void>({
    query:()=>({
        url:"ticket/nombreTicketMonth"
    })
}),
getNombreQuartier:build.query<nombreQuartier[],void>({
    query:()=>({
        url:"ticket/nombreTicketQuartier"
    })
}),
getTableTicketCategorie:build.query<tableTicket[],{categorie:string}>({
    query:({categorie})=>({
        url:`ticket/tableTicketCategorie/${categorie}`
    })
}),
getTableTicketDirection:build.query<tableTicket[],{direction:string}>({
    query:({direction})=>({
        url:`ticket/tableTicketDirection/${direction}`
    })
}),
getTableTicketDepartemment:build.query<tableTicket[],{Departemment:string}>({
    query:({Departemment})=>({
        url:`ticket/tableTicketDepartement/${Departemment}`
    })
}),
getTableTicketPersonnel:build.query<tableTicket[],{Personnel:string}>({
    query:({Personnel})=>({
        url:`ticket/tableTicketPersonnel/${Personnel}`
    })
}),
getTableTicketEnvironnement:build.query<tableTicket[],{Environnement:string}>({
    query:({Environnement})=>({
        url:`ticket/tableTicketEnvironnement/${Environnement}`
    })
}),
getTableTicketMonth:build.query<tableTicket[],{month:string}>({
    query:({month})=>({
        url:`ticket/tableTicketMonth/${month}`
    })
}),
getTableTicketStatut:build.query<tableTicket[],{statut:string}>({
    query:({statut})=>({
        url:`ticket/tableTicketStatut/${statut}`
    })
}),
getTableTicketFeedBack:build.query<tableTicket[],{statut:string}>({
    query:({statut})=>({
        url:`ticket/tableTicketFeedBack/${statut}`
    })
}),
register:build.mutation<responseSignIn,Partial<userRegister>>({
    query: (userRegister) => ({
        url: `auth/register`,
        method: "POST",
        body: userRegister,
    }),
}),
}),
})

export const {useCreateReclamationMutation,useGetReclamationQuery,
    useDeleteReclamationMutation,useGetReclamationByIdQuery,useUpdateAdminMutation,useUpdateSuperAdminMutation,
    useDeletePlaignantMutation,useCreatePlaignantMutation,useGetPlaignantByIdQuery
,useGetPlaignantQuery,useUpdatePlaignantMutation,useUpdateReclamationMutation,
useCreateAssignationMutation,useCreateTicketMutation,useCreatePersonnelMutation,
useDeleteAssignationMutation,useDeletePersonnelMutation,useDeleteTicketMutation,
useGetTicketIdQuery,useGetAssignationIdQuery,useGetAssignationQuery,useGetPersonnelByIdQuery,
useGetPersonnelQuery,useGetTicketQuery,useUpdateAssignationMutation,useUpdatePersonnelMutation,
useUpdateTicketMutation,useCreateEnvironnementMutation,useDeleteEnvironnementMutation,useGetEnvironnementIdQuery,
useGetEnvironnementQuery,useUpdateEnvironnementMutation,useCreateAttachementMutation,useCreateDocumentMutation,
useCreateImageMutation,useCreateVideoMutation,useCreateVocalMutation,useDeleteAttachementMutation,
useDeleteDocumentMutation,useDeleteImageMutation,useDeleteVideoMutation,useDeleteVocalMutation,
useGetAttachementIdQuery,useGetAttachementQuery,useGetDocumentIdQuery,useGetDocumentQuery,useGetImageIdQuery,useUpdateDocumentMutation,
useCreateRapportTicketMutation,useGetRapportTicketQuery,useUpdateAttachementMutation,useUpdateRapportTicketMutation,
useGetRapportTicketyIdQuery,useUpdateImageMutation,useUpdateTicketStatutMutation,useGetPersonnelByDepartementQuery,useGetPersonnelByDirectionQuery
,useGetPersonnelByPosteQuery,useSendMessageMutation,useCreateDepartementMutation,useCreateDirectionMutation,useCreateCommuneMutation,useGetCommuneIdQuery,
useGetCommuneQuery,useDeleteCommuneMutation,useUpdateCommuneMutation,useGetQuartierIdQuery,useGetQuartierQuery,useUpdateQuartierMutation,useDeleteQuartierMutation,
useGetDepartementIdQuery,useGetDepartementQuery,useGetDirectionIdQuery,useGetDirectionQuery,useGetPosteQuery,useChangePasswordMutation,useGetAdminByIdQuery,
useGetAdminQuery,useGetSuperAdminByIdQuery,useUpdatePersonnelInformationMutation,useUpdateVideoMutation,useUpdateVocalMutation,useDeleteAdminMutation,useDeleteSuperAdminMutation,
useGetTableTicketCategorieQuery,useGetTableTicketDepartemmentQuery,useGetTableTicketDirectionQuery,useGetTableTicketEnvironnementQuery,useGetTableTicketMonthQuery,
useGetTableTicketPersonnelQuery, useGetTableTicketStatutQuery,useGetTableTicketFeedBackQuery,useRegisterMutation,useGetImageQuery,useGetVideoQuery,useGetVocalIdQuery,
useGetVocalQuery
} = api;


/*
// Supposons que `base64String` soit la chaîne encodée en base64 reçue depuis le backend.
const base64String = "data:image/jpeg;base64,...";  // Exemple avec préfixe de type de fichier

// Conversion en données binaires
function base64ToBlob(base64, mimeType = '') {
    const byteChars = atob(base64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

// Exemple d'utilisation pour créer un objet Blob avec type MIME
const mimeType = "audio/mpeg"; // ou autre type selon le fichier
const blob = base64ToBlob(base64String.split(",")[1], mimeType);

// Utilisation Blob pour les lecteurs, etc.
const url = URL.createObjectURL(blob);
const audio = new Audio(url);
audio.play();
  */