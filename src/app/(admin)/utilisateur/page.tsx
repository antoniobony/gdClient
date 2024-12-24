import Header from "@/app/(component)/Header/Header"
import Tableheader from "@/app/(component)/Table/TableHeader/TableHeader"
import TableView from "@/app/(component)/Table/TableView"
import axios, { AxiosResponse, isAxiosError } from "axios"
import { cookies } from "next/headers"

async function getAdmin(){
        try{
            const data:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/admin",{
                headers:{
                    "Authorization":"Bearer "+cookies().get("token")?.value,
                    "Content-Type":"application/json"
                }
            })
            return data.data
        }catch(error){
            console.log(error)
        }   
        return null
}

async function getPersonnel(){
    try{
        const data:AxiosResponse<any,any> = await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/personnel",{
            headers:{
                "Authorization":"Bearer "+cookies().get("token")?.value,
                "Content-Type":"application/json"
            }
        })
        return data.data
    }catch(error){
        console.log(error)
    }   
    return null
}

interface Column {
    id: string | number;
    label: string;
    align?: 'left' | 'right' | 'middle'; 
}  
const dataHeader:Column[]=[
        {
            id:0,
            label:"Nom",
            align:"left"
        },{ 
            id:1,
            label:"Prenom",
            align:"middle"
        },{
            id:2,
            label:"Email",
            align:"middle"
        },{
            id:3,
            label:"Phone",
            align:"middle"
        },{
            id:4,
            label:"Cin",
            align:"middle"
        },{
            id:5,
            label:"Date de naissance",
            align:"middle"
        },{
            id:6,
            label:"Adresse",
            align:"middle"
        },{
            id:7,
            label:"Sexe",
            align:"middle"
        },{
            id:8,
            label:"Role",
            align:"middle"
        }
]

interface rows{    
    nom:string;
    
    prenom:string;

    email:string;

    cin:string;

    phone:string;
    
    role:string;

    adresse:string;    

    sexe:string;
  
    dateNaissance:string;
}

export default async function Page({children}:{children:React.ReactNode}){
let da = getPersonnel() as Promise<rows[]>
let da1 = getAdmin() as Promise<rows[]>

const[personnel,plaignant]= await Promise.all([da,da1])

const data = plaignant.concat(personnel)

return (
    <>
         <div className="h-[540px] w-full px-4 pb-8 xl:px-6 ">
            <div className="pt-5">
                <Header name="Utilisateur" isSmallText/>
            </div>
                <div className="table w-full  rounded-lg shadow-md">
                    <Tableheader data={dataHeader}/>
                    <div className="table-row-group" >
                        { data &&   data.map((row,i) => (
                        <div className={`table-row ${i % 2 ==0 ? "bg-gray-100 dark:bg-dark-secondary":"bg bg-gray-200 dark:bg-gray-800"} `} key={i}>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.nom}</div>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.prenom}</div>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.email}</div>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.phone}</div>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.cin}</div>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.dateNaissance}</div>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.adresse}</div>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.sexe}</div>
                            <div className="table-cell py-2 px-4 dark:text-white">{row.role}</div>
                        </div>
                      ))}
                    </div>
                </div>           
        </div>
    </>
)
}