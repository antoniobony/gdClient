"use client"
import Cookies from 'js-cookie';
import React, { useState, ChangeEvent, MouseEvent } from 'react';

import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Field from '../(component)/Field/Fields';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setToken, userType } from '../state/authState';
import Image from 'next/image';


export function FormComponent() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [identifierError, setIdentifierError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [MessageError, setMessageError] = useState<string>('');

  const router = useRouter()

  const dispatch = useDispatch()

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const validateIdentifier = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (emailRegex.test(value) || phoneRegex.test(value)) {
      setIdentifierError('');
    } else {
      setIdentifierError('Veuillez saisir un email ou un numéro valide');
    }
  };

  const validatePassword = (value: string) => {
    if (value.length >=6) {
      setPasswordError('');
    } else {
      setPasswordError('Mot de passe devrait etre supérieur ou égale à 6');
    }
  };

  const handleIdentifierChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIdentifier(value);
    validateIdentifier(value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };


  const handlesubmit=async(e:any)=>{
    e.preventDefault()
    try {
    const res:AxiosResponse<any,any> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/authenticate`,
      { identifier:identifier, 
        password:password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const user:userType= {
      id:res.data.id,
      role:res.data.role,
      token:res.data.token ,
      poste:res.data.poste?.designation  
    }
    
    Cookies.set('token', user.token as string, { expires: 7 ,secure:true})
    Cookies.set('email', res.data.email as string, { expires: 7,secure:true })
    Cookies.set('id', res.data.id as string, { expires: 7 ,secure:true})
    Cookies.set('role',user.role as string, { expires: 7 ,secure:true})
    Cookies.set('poste',user.poste as string, { expires: 7 ,secure:true})
    
    dispatch(setToken(user))
    user.role === "PERSONNEL" ? router.push(`/ticket/${user.id}/${user.poste ==="Agent" ?"niveau1" : user.poste === "DirecteurES" ? "niveau2": 
    user.poste ==="Opérateur"? "niveau4":"niveau3"}`):router.push("/home")
  } catch (e:any) {

    if(e instanceof AxiosError){
      setMessageError(e.response?.data?.message)
    }
    console.log(e)
  }
  
  }
 
  return (
    <>
{
      <form  onSubmit={handlesubmit} className="card shadow-lg border-2 border-blue-primary border-solid rounded-3xl  p-10 mx-auto mt-32  py-5 px-5 max-w-xl flex flex-col space-y-5  ">
        <Image className="mx-auto" src="/assets/logo1.png" alt="sary" width={50} height={50}/>
        <h1 className='mx-auto text-xl font-bold mb-4 text-blue-primary'>Se connecter</h1>
        <Field 
          type='text'
          placeholder="Email ou numéro téléphonique"
          value={identifier}
          onChange={handleIdentifierChange}
          error={!!identifierError}
          errorText={identifierError}
          name="identifier"
          required
          />
        
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" error={!!passwordError}>Mot de passe</InputLabel>
          <OutlinedInput
            required
            name="password"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mot de passe"
          />
          <FormHelperText error={!!passwordError}>{passwordError}</FormHelperText>
        </FormControl>
        <p className="mx-auto text-red-500">{MessageError}</p>
        <button  className="bg-blue-600 w-50 p-3 mx-auto text-white rounded font-bold" disabled={passwordError !=="" || identifierError !==""}>Se connecter</button>          
        <a className='mx-auto underline text-sky-500' href="/inscription">S'inscrire</a>
    </form>
    }
    </>
  );
}

export default FormComponent;
