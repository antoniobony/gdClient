import { ReactNode } from "react";

export default function CardStat({nombre,label,image}:{nombre:string,label:string,image:ReactNode}){
return(
    <div className=" min-w-80 w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between">
            <div>
                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">{nombre}</h5>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">{label}</p>
            </div>
            <div className="flex items-center px-2.5 py-0.5 text-base font-se">
                {image}
            </div>
        </div>
    </div>
)
}