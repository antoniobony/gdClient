import PageNiveau2 from "./page";

export default function Default({params,children}:{params:{id:string},children:React.ReactNode}){
    return (<>
                <PageNiveau2 params={params} children={children}/>
            </>) 
} 