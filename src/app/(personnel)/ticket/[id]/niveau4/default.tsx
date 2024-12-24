import PageNiveau4 from "./page";

export default function Default({params,children}:{params:{id:string},children:React.ReactNode}){
    return (<>
                <PageNiveau4 params={params} children={children}/>
            </>) 
} 