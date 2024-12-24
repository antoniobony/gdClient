import "./nav.css"
import Link from "next/link";
import React from "react";
import { LogOut, Menu, Moon, Settings, Sun } from "lucide-react";
import { useAppDispatch } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/app/state";
import Cookies from 'js-cookie';
import { clearToken } from "@/app/state/authState";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isSidebarCollapsed: boolean;
  isDarkMode:boolean
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarCollapsed,isDarkMode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter()
  return (
    <div className="flex items-center justify-between  bg-white px-4 py-3 dark:bg-zinc-950">
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}

      </div>

      <div className="flex items-center">
        <h1 className="font-extrabold text-2xl text-blue-primary">Société Hydroéléctricité de Sahofika</h1>
      </div>

      <div className="flex items-center">
            <button
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
            className={isDarkMode ? `rounded p-2 dark:hover:bg-gray-800`:
                `rounded p-2 hover:bg-gray-100`
            }
            >
                {
                    isDarkMode ? (
                        <Sun className="h-6 w-6 cursor-pointer dark:text-white"/>
                    ):(
                        <Moon className="h-6 w-6 cursor-pointer dark:text-white"/>
                    )
                }
            </button>
        <div  className=
        {
            isDarkMode ? `h-min w-min rounded p-2  dark:hover:bg-gray-800`:
            `rounded p-2 hover:bg-gray-100`
        }
        >
          <LogOut onClick={()=>{
            Cookies.remove("token");
            Cookies.remove("email");
            Cookies.remove("id");
            Cookies.remove("poste");
            Cookies.remove("role");
            dispatch(clearToken())
            router.push("/connexion")
          }} className="h-6 w-6 cursor-pointer dark:text-white" />
        </div>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};


export default Navbar;


