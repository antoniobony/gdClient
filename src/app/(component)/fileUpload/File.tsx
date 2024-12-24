"use client"

import { useEffect, useState } from "react";

const Fileupload =({onChange,name}:{onChange:(files: File[]) => void,name:string})=>{
    
    const [fileObjects, setFileObjects] = useState<File[]>([]); // Contient les objets `File`

  const uploadMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setFileObjects((prev) => [...prev, ...files]);
  };


  // Mise à jour des fichiers dans le parent via un effet
  useEffect(() => {
    onChange(fileObjects);
  }, [fileObjects, onChange]);
    return(
    <>
        <h1 className="mb-3 font-bold">{name}</h1>
        <div className="flex items-center space-x-6">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file"name={name} onChange={uploadMultipleFiles} multiple className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-blue-700
                hover:file:bg-violet-100
              "/>
            </label>
          </div>
    </>
    )    
}

export default Fileupload;