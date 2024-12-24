import { TextField } from "@mui/material";
import React from "react";

type Props= {
    className?:string,
    name:string,
    placeholder?:string,
    onChange?:(e:any)=>void,
    defaultValue?:any,
    hidden?:boolean,
    error?:boolean,
    errorText?:string
}

type Ref = HTMLTextAreaElement; 

const TextAreaField = React.forwardRef<Ref, Props>(({name,onChange,defaultValue,hidden,placeholder,error,errorText,className}:Props,ref)=>(
    <TextField  type="text" className={className} name={name} label={placeholder} 
    inputRef={ref} onChange={onChange} defaultValue={defaultValue} hidden={hidden} helperText={errorText} error={error} required/>
)
)

export default TextAreaField;