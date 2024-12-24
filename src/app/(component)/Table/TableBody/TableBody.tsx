import React from "react";
import { Edit,Trash } from "lucide-react";

interface rows {
  id: string | number ;
  designation: string; 
  niveau?:boolean
  code?:string;
  commune?:{
    id:string|number,
    designation:string
  };
  poste?:{
    id:string|number,
    designation:string,
    code:string,
  };
  categorie?:{
    id:string,
    designation:string
  }
  direction?:{
    id:string|number,
    designation:string,
    code:string,
  }
  departement?:{
    id:string|number,
    designation:string,
    code:string,
  }
}

interface Props {
  data: rows[],
  onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void
}


const TableBody = ({ data,onClick}:Props) => {
  return (
    <>
    <div className="table-row-group " >
    { data &&   data.map((row,i) => (
        <div className={`table-row ${i % 2 ==0 ? "bg-gray-100 dark:bg-dark-secondary":"bg bg-gray-200 dark:bg-gray-800"} `} key={i}>
          <div className="table-cell py-2 px-4 dark:text-white">{row.id}</div>
          {row.code &&(<div className="table-cell py-2 px-4 dark:text-white">{row.code}</div>)}
          <div className="table-cell py-2 px-4 dark:text-white">{row.designation}</div>
          {row.categorie?.designation &&(<div className="table-cell py-2 px-4 dark:text-white">{row.categorie.designation}</div>)}
          {row.commune?.designation &&(<div className="table-cell py-2 px-4 dark:text-white">{row.commune.designation}</div>)}
          {row.poste?.designation &&(<div className="table-cell py-2 px-4 dark:text-white">{row.poste.designation}</div>)}
          {row.direction?.designation ? <div className="table-cell py-2 px-4 dark:text-white">{row.direction?.designation}</div>:
          row.niveau ? <div className="table-cell py-2 px-4 dark:text-white">Néant</div>:""}
          {  row.departement?.designation ? <div className="table-cell py-2 px-4 dark:text-white">{row.departement?.designation}</div>:
          row.niveau ? <div className="table-cell py-2 px-4 dark:text-white">Néant</div>:""}
          < div className="table-cell py-2 px-4 space-x-2 dark:text-white">
            <button onClick={onClick} id={row.id as string} className="bg-blue-primary p-2 text-white rounded-md shadow-xl" value="modifier">
              modifier
            </button>
            <button onClick={onClick} id={row.id as string} className="bg-red-500 p-2 text-white rounded-md shadow-xl" value="supprimer">
              supprimer
            </button>
          </div>
        </div>
      ))}
      </div>
      </>
  );

};

export default TableBody;
