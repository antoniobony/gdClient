"use client"

import Field from "@/app/(component)/Field/Fields";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { response, useGetAdminByIdQuery, useGetPersonnelByIdQuery, useGetSuperAdminByIdQuery, useUpdateAdminMutation, useUpdatePersonnelInformationMutation, useUpdatePersonnelMutation, useUpdateSuperAdminMutation } from "@/app/state/api";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { getId, getRole } from "@/app/state/authState";
import Error from "@/app/(component)/Error/Error";

 
export default function Page({params}:{params:{id:string}}){
    const role = useSelector(getRole)
    const {data:data,error:error,isLoading:loading} = role ==="PERSONNEL" ? useGetPersonnelByIdQuery({personnelId:params.id}) :
    role ==="ADMIN" ? useGetAdminByIdQuery({plaignantId:params.id}):useGetSuperAdminByIdQuery({plaignantId:params.id})

    const [updateAdmin,{error:errorAdmin,isLoading:isLoadingUpdateAdmin}] = useUpdateAdminMutation()
    const [updatePersonnel,{error:errorPersonnelUpdate,isLoading:isLoadingPersonnelUpdate}] = useUpdatePersonnelInformationMutation()
    const [updateSuperAdmin,{error:errorSuperAdminUpdate,isLoading:isLoading}] = useUpdateSuperAdminMutation()

    const nom = React.createRef<HTMLInputElement>()
    const prenom = React.createRef<HTMLInputElement>()
    const cin = React.createRef<HTMLInputElement>()
    const adresse = React.createRef<HTMLInputElement>()
    const phone = React.createRef<HTMLInputElement>()
    const email = React.createRef<HTMLInputElement>()


    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(data?.dateNaissance));
    
      const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
        console.log('Date choisie:', newDate?.format('YYYY-MM-DD'));
      };

    const handleSubmit=async(e:any)=>{
        e.preventDefault()
        try{
            if(role === "PERSONNEL" ){
                await updatePersonnel({
                    id: params.id,
                    nom:nom.current?.value,
                    dateNaissance:selectedDate?.toISOString(),
                    cin:cin.current?.value,
                    phone:phone.current?.value,
                    prenom:prenom.current?.value,
                    email:email.current?.value,
                    adresse:adresse.current?.value
                }).unwrap()
            }else if(role === "ADMIN"){
                await updateAdmin({
                    id: params.id,
                    nom:nom.current?.value,
                    dateNaissance:selectedDate?.toISOString(),
                    cin:cin.current?.value,
                    phone:phone.current?.value,
                    prenom:prenom.current?.value,
                    email:email.current?.value,
                    adresse:adresse.current?.value
                }).unwrap()
            }else{
                await updateSuperAdmin({
                    id: params.id,
                    nom:nom.current?.value,
                    dateNaissance:selectedDate?.toISOString(),
                    cin:cin.current?.value,
                    phone:phone.current?.value,
                    prenom:prenom.current?.value,
                    email:email.current?.value,
                    adresse:adresse.current?.value
                }).unwrap()
            }
            alert("succès")
        }catch(e){
            if(errorAdmin){
                const error = errorAdmin as response 
                console.log(error.data)
            }
            if(errorPersonnelUpdate){
                const error = errorPersonnelUpdate as response 
                console.log(error.data)
            }   
            if(errorSuperAdminUpdate){
                const error = errorSuperAdminUpdate as response 
                console.log(error.data)
            }
        }
        
    }
    
    if(loading) return(
        <CircularProgress sx={{margin:"auto"}}/>
    )

    if(error ) return (<Error/>)

    return(
        <>
            <form onSubmit={handleSubmit} className="flex flex-col   lg:ml-60 space-y-5 justify-start min-w-min max-w-[500px]">
                <Field className="dark:border-[1px] border-blue-primary" placeholder="nom" type="text" name="Nom"  defaultValue={data?.nom} ref={nom} />
                <Field placeholder="prenom" type="text" name="Prenom" defaultValue={data?.prenom} ref={prenom}/>
                <Field placeholder="adresse" type="text" name="Adresse" defaultValue={data?.adresse} ref={adresse}/>
                <Field placeholder="email" type="email" name="Adresse email" defaultValue={data?.email} ref={email}/>
                <Field placeholder="cin" type="text" name="Cin"  defaultValue={data?.cin} ref={cin}/>
                <Field placeholder="phone" type="phone" name="Phone" defaultValue={data?.phone} ref={phone}/>
                <button
                type="submit"
                className="bg-blue-600 w-50 p-3 mx-auto text-white rounded font-bold "
                >
                    Modifier
                </button>
            </form>
        </>
    )
}


    