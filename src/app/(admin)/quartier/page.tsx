import Quartier from ".";

export default  function Page({children}:{children:React.ReactNode}) {
  return (
     <>
        <div className="px-4 xl:px-6 ">
          <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
            <Quartier name="Quartier" />
              {children}
          </div>
        </div>
      </>
          )
  }