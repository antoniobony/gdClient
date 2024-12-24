import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { ChangeEvent, MouseEvent } from "react";

type FieldPassword ={
    label:string,
    showPassword:boolean,
    password:string,
    handlePasswordChange:(event: ChangeEvent<HTMLInputElement>) =>void,
    handleClickShowPassword:(event: MouseEvent<HTMLButtonElement>)=>void,
    handleMouseDownPassword:(event: any)=>void,
    passwordError:string,
    className?:string,
    name?:string
}


const FieldPassword = ({
    label:label,
    showPassword,
    password,
    handlePasswordChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    passwordError,
    className,
    name
}:FieldPassword)=>(
    <FormControl  fullWidth variant="outlined">
        <InputLabel   htmlFor="outlined-adornment-password" className="dark:text-blue-primary" error={!!passwordError}>{label}</InputLabel>
        <OutlinedInput
          required
          name= {name ? name: "password"}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          error={!!passwordError}
          className={className}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff className="dark:text-white" /> : <Visibility className="dark:text-white"  />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
        <FormHelperText error={!!passwordError}>{passwordError}</FormHelperText>
      </FormControl>
) 

export default FieldPassword;