import { Ellipsis, EllipsisVertical } from "lucide-react";
import React from "react"
import {DndProvider, useDrop} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { CardReclam, CardTicket } from "../Card/Card";
import { personnel,ticket,assignation, rapportTicket } from "@/app/state/api"; 

type BoardProps = {
    id: string,
    setIsModalNewTaskOpen:(isOpen:boolean)=> void;
}

type Props = {
    data:recla[]
    onClick:(e:React.MouseEvent<SVGSVGElement>)=>void
    update:(data:recla,statut:string)=>void;
    role:string;
}


export const BoardView =({data,onClick,update,role}:Props)=>{
return(
    <DndProvider backend={HTML5Backend}>
        <div className="grid  grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4"> 
            {
                role != "agent"&&(
                    <TaskColumn
                    onClick={onClick}
                    key="Créer"
                    statut="Créer"
                    data={data}
                    update={update}
                    role={role}
                    />
                )
            }
            
            <TaskColumn
            onClick={onClick}
            key="A traiter"
            statut="A traiter"
            data={data}
            update={update}
            role={role}
            />
            <TaskColumn
            onClick={onClick}
            key="Aprouvé"
            statut="Aprouvé"
            data={data}
            update={update}
            role={role}
            />
            <TaskColumn
            onClick={onClick}
            key="Clôturé"
            statut="Clôturé"
            data={data}
            update={update}
            role={role}
            />
        </div>
    </DndProvider>    
)
}



type recla={
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
    role:string,}
        personnel?:{id:string,
            nom:string,
            dateNaissance:any,
            sexe:string,
            cin:string,
            phone:string,
            prenom:string,
            email:string,
            role:string,}
}

type TaskColumnProps={
    statut:string,
    data:recla[],
    onClick:(e:React.MouseEvent<SVGSVGElement>)=>void
    update:(data:recla,statut:string)=>void;
    role:string;
    //setIsModalNewTaskOpen:(isOpen: boolean)=>void 
}

type MyProps= {
    recla:recla;
    }

const TaskColumn=({
    statut,
    data,
    onClick,
    update,
    role
}:TaskColumnProps)=>{
    
    const [{isOver},drop]=useDrop(()=>({
    accept:"task",  
    drop:(item:{data:recla})=>update(item.data,statut),
    collect:(monitor:any)=>({
        isOver: !!monitor.isOver()
    })
    }));

    const StatusColor:any={
        "Créer":"#2563EB",
        "A traiter":"#059669",
        "Aprouvé":"#D97706",
        "Clôturé":'purple'
    }

    return(
        <div ref={(instance)=>{
            drop(instance);
        }}
        className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950":""}`}
        >
            <div className="mb-3 flex w-full">
                <div className={`w-2 !bg-[${StatusColor[statut]}] rounded-s-lg`}
                    style={{backgroundColor:StatusColor[statut]}}/>
                    <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4
                    dark:bg-dark-secondary
                    ">
                        <h3 className="flex items-center text-lg font-semibold dark:text-white">
                            {statut}
                            <span className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none
                            dark:bg-dark-tertiary"style={{width:"1.5rem"}}>  
                            {data.filter((d)=>d.statut===statut).length}  
                            </span>
                        </h3>
                        <div className="flex items-center gap-1">
                            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
                                <EllipsisVertical size={26}/>
                            </button>
                        </div>    
                    </div>
                </div >

            { data.filter((d)=>d.statut===statut).map((d)=>(
                <CardReclam role={role} onClick={onClick} recla={d} key={d.id} />
            ))}
        </div>
    )
}





const TicketColumn = ({
  statut,
  data,
  onClick,
  update,
  role,
  rapport,
  assignation
}: {
  statut: string;
  data: ticket[];
  onClick: (id: string) => void;
  update: (data: ticket, statut: string) => void;
  role: string;
  rapport?:rapportTicket[],
  assignation?:assignation[]
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CardPersonnel",
    drop: (item: { data: ticket }) => update(item.data, statut),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const StatusColor: any = {
    Créer: "#2563EB",
    Traitement: "#059669",
    Retraitement: "purple",
    "A clôturer": "#D97706",
    Validation: "#D97706",
    Clôturé: "black",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${
        isOver ? "bg-blue-100 dark:bg-neutral-950" : ""
      }`}
    >
      {/* En-tête */}
      <div className="mb-3 flex w-full">
        <div
          className={`w-1 !bg-[${StatusColor[statut]}] rounded-s-lg`}
          style={{ backgroundColor: StatusColor[statut] }}
        />
        <div
          className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4
                    dark:bg-dark-secondary"
        >
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {statut}
            <span
              className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none
                            dark:bg-dark-tertiary"
              style={{ width: "1.5rem" }}
            >
              {data.filter((d) => d.statut === statut).length}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
              <EllipsisVertical size={26} />
            </button>
          </div>
        </div>
      </div>

      {/* Contenu défilable */}
      <div
  className="max-h-96 md:max-h-[700px] overflow-y-auto p-5 custom-scrollbar"
>
  {data
    .filter((d) => d.statut === statut)
    .map((d) => (
      <CardTicket 
        rapport={rapport} 
        assignation={assignation} 
        role={role} 
        onClick={onClick} 
        ticket={d} 
        key={d.id} 
      />
    ))}
</div>
</div>
  );
};

export default TicketColumn;


export const BoardViewPersonnel = ({data,onClick,update,role,rapport,assignation}:{data: ticket[]
    assignation?:assignation[],
    rapport?:rapportTicket[],
    onClick:(id:string)=>void
    update:(data:ticket,statut:string)=>void;
    role:string;})=>{
    return(
        <DndProvider backend={HTML5Backend}>
            <div className={`grid  grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4 ${role ==="agent" ? "2xl:grid-cols-6":"2xl:grid-cols-5"} `} > 
                {
                    role == "agent"&&(
                        <TicketColumn
                        onClick={onClick}
                        key="Créer"
                        statut="Créer"
                        data={data}
                        update={update}
                        role={role}
                        />
                    )
                }
                
                <TicketColumn
                onClick={onClick}
                key="Traitement"
                statut="Traitement"
                data={data}
                update={update}
                role={role}
                rapport={rapport} 
                assignation={assignation}
                />
                
                <TicketColumn
                    onClick={onClick}
                    key="Retraitement"
                    statut="Retraitement"
                    data={data}
                    update={update}
                    role={role}
                    rapport={rapport} 
                    assignation={assignation}
                />

                {
                    role !=="opérateur"&&(
                        <TicketColumn
                        onClick={onClick}
                        key="Validation"
                        statut="Validation"
                        data={data}
                        update={update}
                        role={role}
                        rapport={rapport} 
                        assignation={assignation}
                            />
                    )
                }
                
            
                <TicketColumn
                    onClick={onClick}
                    key="A clôturer"
                    statut="A clôturer"
                    data={data}
                    update={update}
                    role={role}
                    />
                
                <TicketColumn
                onClick={onClick}
                key="Clôturé"
                statut="Clôturé"
                data={data}
                update={update}
                role={role}
                />
            </div>
        </DndProvider>    
    )
    }





