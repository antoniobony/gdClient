import { EllipsisVertical, Edit,Trash, Edit3Icon, View, ActivityIcon, Ticket, CalendarCheck  } from "lucide-react"
import { assignation, direction, rapportTicket, ticket, useGetQuartierQuery, vocal } from "@/app/state/api";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";
import Popup from "../popup/popup";
import Cookies from "js-cookie";

type recla={
    id:string;
    dateCreation:string;
    description:string;
    statut:string;
    premierRencontre?:string;
    plaignant?:{id:string,
        nom:string,
        dateNaissance:any,
        sexe:string,
        cin:string,
        phone:string,
        prenom:string,
        email:string,
        role:string,}
}

type Props= {
recla:recla;
onClick:(e:React.MouseEvent<SVGSVGElement>)=>void;
role:string;
}

export const CardReclam=({recla,onClick,role}:Props)=>{
    const [{isDragging},drag] = useDrag(()=>({
        type:"task",
        item:{data:recla},
        collect:(monitor:any)=>({
            isDragging: !!monitor.isDragging()
        })
    })) 
    
    const StatusColor:any={
        "Créer":"#2563EB",
        "A traiter":"#059669",
        "Aprouvé":"#D97706",
        "Clôturé":'purple'
    }

    let d = new Date(recla.dateCreation)
    let d1 = new Date(recla.premierRencontre as string) 
    const da = d.toLocaleString()
    const da1 = d1.toLocaleString()
    return(
        <>
            <div ref={(instance)=>{
            drag(instance);
            }}
        className={` card  mb-4 h-40 rounded-lg shadow  justify-between scale-95 ${isDragging ?"opacity-50":"opacity-100"}`}>
                <div className={`flex px-2 py-2 rounded-t-md items-start justify-between`}
                 style={{backgroundColor:StatusColor[recla.statut]}}
                >
                    <h4 className="text-lg font-bold dark:text-white">Reclamation {recla.id}</h4>
                    {recla.statut==="Créer" &&(<div className="flex items-center justify-around">
                        <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
                            <Edit id={recla.id+"e"} onClick={onClick} stroke="white" size={15}/>
                        </button>
                        <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
                            <Trash id={recla.id+"d"} onClick={onClick} stroke="white" size={15}/>
                        </button>
                    </div>)}
                    
                </div>
                <h1 className="text-xs px-2 py-2 text-gray-500 dark:text-neutral-500">
                    {da}
                </h1>
                <h1 className="text-xs px-2 py-2 text-gray-500 dark:text-neutral-500">
                    {da1}
                </h1>
                <p className="px-2 py-2 text-md text-gray-600 dark:text-neutral-500">
                    {recla.description}
                </p>
            </div>   
        </>
    )
}

export const CardAttachement=({data,name,onClick}:{onClick: (id:string,name:string)=>void,data:vocal,name:string})=>{
    
    const StatusColor:any={
        "Document":"#2563EB",
        "Image":"#059669",
        "Vidéo":"#D97706",
        "Vocal":'purple'
    }

    return(
        <>
            <div 
                className={` card  mb-4 h-40 rounded-lg shadow  justify-between scale-95 `}>
                <div className={`flex px-2 py-2 rounded-t-md items-start justify-between`}
                 style={{backgroundColor:StatusColor[name]}}
                >
                    <h4 className="text-lg font-bold dark:text-white">{name} {data.id}</h4>
                    <button onClick={()=>onClick(data.id,name)} className="flex h-6 w-5 items-center justify-center cursor-pointer dark:text-neutral-500">
                            <View  stroke="white" size={15}/>
                    </button>  
                </div>
            </div>   
        </>
    )
}


export const CardTicket = ({ticket,onClick,role,rapport,assignation}:{ticket:ticket,onClick:(id:string)=>void,role:string;rapport?:rapportTicket[],assignation?:assignation[];}) =>{
    const [{isDragging},drag] = useDrag(()=>({
        type:"CardPersonnel",
        item:{data:ticket},
        collect:(monitor:any)=>({
            isDragging: !!monitor.isDragging()
        })
    }))

    const StatusColor:any={
        "Créer":"#2563EB",
        "Traitement":"#059669",
        "Retraitement":"purple",
        "A clôturer":"#D97706",
        "Validation":"#D97706",
        "Clôturé":"purple"
    }
 
   
   
    return(
        <>
            <div ref={(instance)=>{
             drag(instance);
            }}
            className={` card  mb-4  rounded-lg shadow  justify-between dark:bg-dark-secondary scale-95 ${isDragging ?"opacity-50":"opacity-100"}`}>
                <div className={`flex px-2 py-2 rounded-t-md items-start justify-between`}
                 style={{backgroundColor:StatusColor[ticket.statut]}}
                >
                    <h4 className="text-lg font-bold dark:text-white"> {ticket.code}</h4>
                    <div className="flex items-center justify-around">

                        {ticket.statut === "Créer"&&(<button onClick={()=>onClick(ticket.id+"d")} className="flex h-6 w-5 items-center justify-center cursor-pointer dark:text-neutral-500">
                            <Trash  stroke="white" size={15}/>
                        </button>)}
                        {
                            ((role === "DirecteurES" && ticket.niveau === "2" && ticket.statut !== "Clôturé" )||(role === "Opérateur" && ticket.niveau === "4" )||(role === "ChefDepart" && ticket.niveau === "3" ))&&(
                            <Popup data={role ==="Opérateur" ? ["Validation"] :  ticket.statut === "Traitement" || ticket.statut ==="Retraitement"  ? 
                                ["Traitement"]:ticket.statut==="A clôturer" && role==="DirecteurES"?["Clôturer"]:["Retraitement","Validation"]} ticket={ticket} onClick={onClick}/>
                            )
                        }

                        <button onClick={()=>onClick(ticket.id+"v")} className="flex h-6 w-5 items-center justify-center cursor-pointer dark:text-neutral-500">
                            <View  stroke="white" size={15}/>
                        </button>                        
                    </div>                    
                </div>
                <div className="flex flex-row py-2 px-2">
                    <h1 className="text-stone-950 font-bold  dark:text-white">Description:</h1>
                    <p className="px-2  text-md text-gray-600 ">
                        {ticket.description}
                    </p>
                </div>
                <div className="flex flex-row py-2 px-2">
                    <h1 className="text-stone-950 font-bold  dark:text-white">Niveau:</h1>
                    <p className="text-md px-2 ml-7 text-gray-500 ">
                        {ticket.niveau}
                    </p>
                </div>
                <div className="flex flex-row py-2 px-2">
                    <h1 className="text-stone-950 font-bold  dark:text-white">Statut:</h1>
                    <p className="text-md px-2 ml-7 text-gray-500 ">
                        {ticket.statut}
                    </p>
                </div>
               
            </div>   
        </>       
    )
}



export const CardAgent1 = ({data,commune}:{data:ticket,commune:string})=>{
    const d = new Date(data.dateCreation).toLocaleString()
    const dateNaissance = new Date(data.dateNaissance).toLocaleDateString()
    return(
        <>        
         < div>
                <div className="table w-full border border-black  rounded-md border-collapse">
                    <div className="table-row-group" >
                        <div className={`table-row`} key="1">
                            <div className="table-cell border border-black py-2 px-4 dark:text-white">Nom et prenom:{data.nom +" "+ data.prenom}</div>
                            <div className="table-cell border border-black py-2 px-4 dark:text-white">Date de naissance:{dateNaissance}</div>
                        </div>
                        <div className={`table-row`} key="2">
                            <div className="table-cell border border-black py-2 px-4 dark:text-white">CIN: {data.cin}</div>
                            <div className="table-cell border border-black py-2 px-4 dark:text-white" >Sexe:{data.sexe}</div>
                        </div>
                        <div className={`table-row`} key="3">
                            <div className="table-cell border border-black py-2 px-4 dark:text-white">Commune:{commune}</div>
                            <div className="table-cell border border-black py-2 px-4 dark:text-white">Fokontany:{data.quartier}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between pt-4">
                    <h1 className="py-2 dark:text-white"><u className="font-bold pr-2">CODE DU TICKET:</u>{data.code}</h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold pr-2">DATE DE CREATION:</u> {d}</h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold pr-2">ORIGINE DU TICKET</u> : </h1>
                    <div className="flex space-x-4">
                        <label>
                            <input type="checkbox" defaultChecked={data.categorieTicket === "Constat"} disabled={data.categorieTicket === "Constat"} /> Constat
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={data.categorieTicket === "Plainte"} disabled={data.categorieTicket === "Plainte"} /> Plainte
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={data.categorieTicket === "Requête"} disabled={data.categorieTicket === "Requête"} /> Requête
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={data.categorieTicket === "Suggestion"} disabled={data.categorieTicket === "Suggestion"} /> Suggestion
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={data.categorieTicket === "Rumeur"} disabled={data.categorieTicket === "Rumeur"}/> Rumeur
                        </label>
                    </div>
                <div className="flex flex-row justify-between mr-7" >
                    <h1 className="py-2 dark:text-white"><u className="font-bold pr-2">DESIGNATION DE L'ENVIRONNEMENT AFFECTE</u>:{data.environnement.designation}</h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold pr-2">CODE</u> : {data.environnement.code}</h1>
                </div>
                <h1 className="py-2 dark:text-white"><u className="font-bold pr-2">NIVEAU:</u> : {data.niveau}</h1>
                <h1 className="py-2 dark:text-white "><u className="font-bold pr-2">DESCRIPTION DES FAITS :</u></h1><u className="dark:text-white"><p >{data.description}</p></u>
                <h1 className="py-2 dark:text-white"><u className="font-bold pr-2">STATUT:</u>{data.statut}</h1>
                </div>
           </div>
        </>
    )
}



export const CardAgent2 = ({data,rapport,poste}:{data:ticket,rapport:rapportTicket,poste?:string})=>{
    const dateTransmission = new Date(rapport.dateTransmission).toLocaleString()
    const dateReception = new Date(rapport.dateReception).toLocaleString()
    return(
        <>        
         < div>
                <div className="flex flex-col justify-between pt-4">
                    <h1 className="py-2 dark:text-white"><u className="font-bold">CODE DU TICKET </u>:{data.code}</h1>
                    {
                        poste === "Agent" &&(
                            <h1 className="py-2 dark:text-white"><u className="font-bold">DATE RECEPTION:</u> {dateReception}</h1>
                        )
                    }<h1 className="py-2 dark:text-white"><u className="font-bold">DATE DE RENCONTRE AVEC LE PLAIGNANT</u> :{data.DateRencotrePlaignant} </h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold">FEEDBACK</u>:</h1>
                    <div className="flex space-x-4">
                        <label>
                            <input type="checkbox" defaultChecked={data.feedback !== null}  disabled={data.feedback !== null} /> OUI
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={data.feedback === null} disabled={data.categorieTicket === null} /> NON
                        </label>
                    </div>
                    <div className="flex space-y-4">
                        <label>
                            <input type="checkbox" defaultChecked={data.feedback === "Incompréhension"} disabled={data.feedback === "Incompréhension"} /> Incompréhension
                        </label>
                        <label>
                            <input type="checkbox" defaultChecked={data.feedback === "Solution inadéquate"} disabled={data.feedback === "Solution inadéquate"} /> Solution inadéquate
                         </label>
                         <label>
                            <input type="checkbox" defaultChecked={data.feedback === "Solution insuffisante"} disabled={data.feedback === "Solution insuffisante"} /> Solution insuffisante
                         </label>
                    </div>
                    <h1 className="py-2 dark:text-white "><u className="font-bold">COMMENTAIRE DU PLAIGNANT :</u></h1><u className="dark:text-white"><p >{data.commentairePLaignant}</p></u>
                    {
                        poste ==="Agent" &&(
                            <h1 className="py-2 dark:text-white"><u className="font-bold">DATE DE TRANSMISSION</u> : {dateTransmission}</h1>
                        )
                    }
                    <h1 className="py-2 dark:text-white"><u className="font-bold">STATUT</u> : {data.statut}</h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold">NIVEAU</u> : {data.niveau}</h1> 
                </div>
           </div>
        </>
    )
}



export const CardDirecteurES1 = ({data,dirDepar,rapport,poste}:{data:ticket,dirDepar:direction,rapport:rapportTicket,poste?:string})=>{
    const dateTransmission = new Date(rapport.dateTransmission).toLocaleString()
    const dateReception = new Date(rapport.dateReception).toLocaleString()
    return(
        <>        
         < div>
                <div className="flex flex-col justify-between pt-4">
                    <h1 className="py-2 dark:text-white"><u className="font-bold">CODE DU TICKET </u>:{data.code}</h1>
                    {
                        poste !==null && (
                            <h1 className="py-2 dark:text-white"><u className="font-bold">DATE RECEPTION:</u> {dateReception}</h1>
                        )
                    }
                    {
                     data.statut !== "Traitement" && (<h1 className="py-2 dark:text-white"><u className="font-bold">OBSERVATION:</u> {rapport.observation}</h1>
                    )}
                    {
                        data.statut !== "Clôturer" && (
                        <div className="flex flex-row space-x-4">
                            <h1 className="py-2 dark:text-white"><u className="font-bold">DIRECTION OU DEPARTEMENT CONCERNEE</u>:{dirDepar.designation}</h1>
                            <h1 className="py-2 dark:text-white"><u className="font-bold">CODE:</u> {dirDepar.code}</h1>
                        </div>)
                    }
                     {
                        poste !==null &&(
                            <h1 className="py-2 dark:text-white"><u className="font-bold">DATE DE {data.statut !== "Clôturer" ? "TRANSMISSION":"CLOTURE"}</u> : {data.statut === "Clôturer" ? data.dateCloture : dateTransmission}</h1>
                        )
                     }
                    
                    <h1 className="py-2 dark:text-white"><u className="font-bold">STATUT</u> : {data.statut}</h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold">NIVEAU</u> : {data.niveau}</h1> 
                </div>
           </div>
        </>
    )
}


export const CardDepartDir = ({data,operateur,rapport,poste}:{poste?:string,data:ticket,operateur:string,rapport:rapportTicket})=>{
    const dateTransmission = new Date(rapport.dateTransmission).toLocaleString()
    const dateReception = new Date(rapport.dateReception).toLocaleString()
    return(
        <>        
         < div>
                <div className="flex flex-col justify-between pt-4">
                    <h1 className="py-2 dark:text-white"><u className="font-bold">CODE DU TICKET </u>:{data.code}</h1>
                    {
                        poste !=null &&(
                            <>
                                <h1 className="py-2 dark:text-white"><u className="font-bold">DATE RECEPTION:</u> {dateReception}</h1>
                                <h1 className="py-2 dark:text-white"><u className="font-bold">{data.statut ==="Retraitement" ? "OBSERVATION":"INSTRUCTION" }:</u> {data.statut ==="Retraitement" ? rapport.observation :rapport.instruction}</h1>
                                <h1 className="py-2 dark:text-white"><u className="font-bold">DATE DE TRANSMISSION</u> : {dateTransmission}</h1>
                            </>        
                        )
                    }
                    <h1 className="py-2 dark:text-white"><u className="font-bold">OPERATEUR CONCERNEE</u>:{operateur}</h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold">STATUT</u> : {data.statut}</h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold">NIVEAU</u> : {data.niveau}</h1> 
                </div>
           </div>
        </>
    )
}

export const CardOperateur = ({data,rapport,poste}:{data:ticket,rapport:rapportTicket,poste?:string})=>{
    const dateTransmission = new Date(rapport.dateTransmission).toLocaleString()
    const dateReception = new Date(rapport.dateReception).toLocaleString()
    return(
        <>        
         < div>
                <div className="flex flex-col justify-between pt-4">
                    <h1 className="py-2 dark:text-white"><u className="font-bold">CODE DU TICKET </u>:{data.code}</h1>
                    {
                        poste !=null &&(
                            <h1 className="py-2 dark:text-white"><u className="font-bold">DATE RECEPTION:</u> {dateReception}</h1>
                        )
                    }
                    <h1 className="py-2 dark:text-white"><u className="font-bold">ANALYSE:</u> {data.analyses}</h1>
                    {
                        poste !== null &&(
                            <h1 className="py-2 dark:text-white"><u className="font-bold">AVIS ET OBSERVATION</u>:{rapport.observation}</h1>
                        )
                    }
                    <div className="flex flex-row space-x-4">
                        <h1 className="py-2 dark:text-white"><u className="font-bold">RESSOURCES HUMAINES IMPLIQUEES</u>:{data.ressourceHumaine}</h1>
                        <h1 className="py-2 dark:text-white"><u className="font-bold">ENTITE/PRESTATAIRE MOBILISE</u>:{data.entitePrestataire}</h1>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <h1 className="py-2 dark:text-white"><u className="font-bold">RESSOURCES MATERIELLE MOBILISEE </u>:{data.ressourceMatierelle}</h1>
                        <h1 className="py-2 dark:text-white"><u className="font-bold">EVALUATION DU COUT</u>:{data.evaluationCout}</h1>
                    </div>
                    {
                        poste !=null &&(
                            <h1 className="py-2 dark:text-white"><u className="font-bold">DATE DE TRANSMISSION</u> : {dateTransmission}</h1>
                        )
                    }
                    <h1 className="py-2 dark:text-white"><u className="font-bold">STATUT</u> : {data.statut}</h1>
                    <h1 className="py-2 dark:text-white"><u className="font-bold">NIVEAU</u> : {data.niveau}</h1> 
                </div>
           </div>
        </>
    )
}


