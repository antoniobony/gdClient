import Poste from ".";

export default function Commune({children}:{children:React.ReactNode}) {
    return (
      <>
        <div className="px-4 xl:px-6 ">
          <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
              <Poste name="Poste"/>
              {children}
          </div>
        </div>
      </>
    )
  }