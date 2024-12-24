import PageNiveau3 from "./page";

export default function Default({params,children}:{params:{id:string},children:React.ReactNode}){
    return (<>
                <PageNiveau3 params={params} children={children}/>
            </>) 
} 