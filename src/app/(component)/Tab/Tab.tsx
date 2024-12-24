type data={
    name:string;
    icon:React.ReactNode;
}


type Props = {
    data:data[]
    setActiveTab:(tabName:string) => void;
    activeTab:string;    
}


const Tab =({data,setActiveTab,activeTab}:Props)=>{
return(
    <>
        <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px]
        pt-2 dark:border-stroke-dark-dark md:items-center
        ">
            <div className="flex flex-1 items-center gap-2 md:gap-4">
                {
                    data.map((d)=>(
                        <TabButton
                        key={d.name}
                        name={d.name}
                        icon={d.icon}
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                        />        
                    ))
                }
                 
            </div>
        </div>
    </>
)
}


type TabButtonProps={
    name:string;
    icon:React.ReactNode;
    setActiveTab:(tabName:string) => void;
    activeTab:string;
}

const TabButton = ({name,icon,setActiveTab,activeTab}:TabButtonProps)=>{
    const isActive = activeTab === name;
    return(
        <button className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute
        after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600
        dark:text-neutral-500 dark:hover:text:white sm:px-2 lg:px-4 ${isActive ? "text-blue-600  after:bg-blue-600 dark:text-white":""}`}
        onClick={()=>setActiveTab(name)}
        >
        {icon}
        {name}
        </button>
    )
}

export default Tab;