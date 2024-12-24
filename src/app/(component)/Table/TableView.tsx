'use client'

import React,{useEffect,useState} from "react";
import {DataGrid,GridColDef,GridRowModel} from "@mui/x-data-grid";
import Tableheader from '@/app/(component)/Table/TableHeader/TableHeader'
import TableBody from "./TableBody/TableBody";




interface Column {
    id: string | number;
    label: string;
    align?: 'left' | 'right' | 'middle'; 
}  


interface rows {
    id: string | number;
    designation: string;
    niveau?:boolean;
    code?:string; 
    commune?:{
        id:string|number,
        designation:string
      };
      poste?:{
        id:string|number,
        designation:string,
        code:string
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
    dataHeader:Column[],
    dataBody:rows[],
    onClick:(e:React.MouseEvent<HTMLButtonElement>)=>void
}


const TableView = ({dataBody,dataHeader,onClick}:Props) =>{
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };
        
    const handleChangeRowsPerPage = (event:any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

   
    return(
        <>
                <div className="table w-full rounded-xl shadow-md">
                    <Tableheader data={dataHeader}/>
                    <TableBody onClick={onClick}  data={dataBody}/>
                </div>
        </>
        
    )
}


export default TableView;