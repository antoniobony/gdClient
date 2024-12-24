import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

interface MultipleImageUploadProps {
  onFilesChange: (files: File[]) => void;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  onFilesChange,
}) => {
  const [multipleFile, setMultipleFile] = useState<string[]>([]);
  const [fileObjects, setFileObjects] = useState<File[]>([]); // Contient les objets `File`

  const uploadMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newFileArray = files.map((file) => URL.createObjectURL(file));

    setMultipleFile((prev) => [...prev, ...newFileArray]);
    setFileObjects((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setMultipleFile((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
    setFileObjects((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  // Mise à jour des fichiers dans le parent via un effet
  useEffect(() => {
    onFilesChange(fileObjects);
  }, [fileObjects, onFilesChange]);

  return (
    <div className="container">
      <h1 className="mb-3 font-bold">Image</h1>
      <div className="flex flex-col">
        <div className="flex flex-row">
          {multipleFile.length > 0 &&
            multipleFile.map((url, index) => (
              <div key={index} className="col-md-2">
                <div className="img-block bg-gray">
                <span
                    className="absolute cursor-pointer bg-red-500 text-white rounded-full p-[1px]"
                    onClick={() => removeImage(index)}
                  >
                    <X size={15}/>
                  </span>
                  <img className="img-fluid2" src={url} alt="Uploaded preview" width={60} height={60}/> 
                </div>
              </div>
            ))}
          <div className="flex items-center space-x-6">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file"name="images"  onChange={uploadMultipleFiles} multiple className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-blue-700
                hover:file:bg-violet-100
              "/>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleImageUpload;
