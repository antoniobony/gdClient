import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props= {
    className?:string,
    name:string,
    onChange?:(e:any)=>void,
    defaultValue?:any,
    data:string[],
    label?:string,
}

type Ref = HTMLSelectElement; 

const Selects = React.forwardRef<Ref, Props>(({name,label,onChange,defaultValue,className,data}:Props,ref)=>(
    <>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name={name}
                label={label}
                inputRef={ref}
                onChange={onChange}
                className={className}
                defaultValue={defaultValue}
                >
                {data.map((d)=>(
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Box>
        </>
)
)

export default Selects;

