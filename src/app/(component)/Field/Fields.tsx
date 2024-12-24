import { TextField } from "@mui/material";
import React from "react"

type Props= {
    type:string,
    className?:string,
    name:string,
    placeholder?:string,
    onChange?:(e:any)=>void,
    defaultValue?:any,
    hidden?:boolean,
    max?:number,
    accept?:string,
    required?:true,
    error?:boolean,
    errorText?:string,
    value?:string,
}

type Ref = HTMLInputElement; 

const Field = React.forwardRef<Ref, Props>(({name,max,error,onChange,type,defaultValue,required,hidden,value,errorText,placeholder,className}:Props,ref)=>(
    
    <TextField
        className={className}
        hidden={hidden}
        maxRows={max}
        label={placeholder}        
        variant="outlined"
        value={value}
        onChange={onChange}
        error={error}
        helperText={errorText}
        name={name}
        type={type}
        required={required}
        inputRef={ref}
        defaultValue={defaultValue}
      />
)
)

export default Field;