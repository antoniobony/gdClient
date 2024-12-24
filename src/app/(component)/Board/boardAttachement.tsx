import { vocal } from "@/app/state/api";
import { CardAttachement } from "../Card/Card";

    const AttachementColumn = ({
        data,
        name,
        onClick
      }: {
        data: vocal[];
        name:string,
        onClick: (id:string,name:string)=>void
      }) => {
      
        const StatusColor:any={
          "Document":"#2563EB",
          "Image":"#059669",
          "Vidéo":"#D97706",
          "Vocal":'purple'
      }
        return (
          <div
            
            className={`sl:py-4 rounded-lg py-2 xl:px-2`}
          >
            {/* En-tête */}
            <div className="mb-3 flex w-full">
              <div
                  className={`w-1 !bg-[${StatusColor[name]}] rounded-s-lg`}
                style={{ backgroundColor: StatusColor[name] }}
              />
              <div
                className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4
                          dark:bg-dark-secondary"
              >
                <h3 className="flex items-center text-lg font-semibold dark:text-white">
                  {name}
                  <span
                    className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none
                                  dark:bg-dark-tertiary"
                    style={{ width: "1.5rem" }}
                  >
                    {data.length}
                  </span>
                </h3>
              </div>
            </div>
      
            {/* Contenu défilable */}
            <div
              className="max-h-80 md:max-h-max overflow-y-auto p-5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "gray lightgray",
              }}
            >
              {data
                .map((d) => (
                  <CardAttachement data={d}  onClick={onClick} name={name} key={d.id} />
                ))}
            </div>
          </div>
        );
      };
      
      export default AttachementColumn;