"use client";

import FieldPassword from "@/app/(component)/Field/FieldsPassword";
import Header from "@/app/(component)/Header/Header";
import { response, useChangePasswordMutation } from "@/app/state/api";
import { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";



export default function Page() {
  const [changePassword, { error: errorChange, isLoading: isLoadingChange }] = useChangePasswordMutation();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowNewPassword = () => setShowNewPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const validatePassword = (value: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
    setError(value.length >= 6 ? "" : "Mot de passe doit être d'au moins 6 caractères.");
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPasswordError(value === newPassword ? "" : "Les mots de passe ne correspondent pas.");
  };

  const handlePasswordChange = (setter: React.Dispatch<React.SetStateAction<string>>, validator: (value: string) => void) => 
    (event: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage("")
      const { value } = event.target;
      setter(value);
      validator(value);
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!passwordError && !newPasswordError && !confirmPasswordError) {
      try {
        const res= await changePassword({ password, newPassword, confirmNewPassword: confirmPassword }).unwrap();
        alert("Mot de passe créer")
        handleSuccessNotification("Mot de passe créer")
      } catch (errorChange) {
        
        const error = errorChange as response
        setErrorMessage(error.data.message)
        console.log( error.data.message)
      }
      
    }
  };

  const handleSuccessNotification = (message: string) => {
    toast.success(message, { autoClose: 3000 });
  };

  const handleErrorNotification = () => {
    toast.error("Une erreur est survenue !", { autoClose: 5000 });
  };

  return (
    <>
      <Header name="Changez votre mot de passe"/>
      <form onSubmit={handleSubmit} className="p-4 space-y-5 flex flex-col w-[300px] sm:w-[500px] rounded-md">
        <FieldPassword
          label="Mot de passe"
          showPassword={showPassword}
          password={password}
          handlePasswordChange={handlePasswordChange(setPassword, (value) => validatePassword(value, setPasswordError))}
          handleClickShowPassword={handleClickShowPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          passwordError={passwordError}
          className="dark:border-[1px] border-blue-primary"
        />
        
        <FieldPassword
          label="Nouveau mot de passe"
          showPassword={showNewPassword}
          password={newPassword}
          handlePasswordChange={handlePasswordChange(setNewPassword, (value) => validatePassword(value, setNewPasswordError))}
          handleClickShowPassword={handleClickShowNewPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          passwordError={newPasswordError}
          className="dark:border-[1px] border-blue-primary"
        />

        <FieldPassword
          label="Confirmer mot de passe"
          showPassword={showConfirmPassword}
          password={confirmPassword}
          handlePasswordChange={handlePasswordChange(setConfirmPassword, validateConfirmPassword)}
          handleClickShowPassword={handleClickShowConfirmPassword}
          handleMouseDownPassword={handleMouseDownPassword}
          passwordError={confirmPasswordError}
          className="dark:border-[1px] border-blue-primary"
        
        />

        <p className="mx-auto text-red-500">{errorMessage}</p>
        
        <button
          type="submit"
          className="bg-blue-600 w-50 p-3 mx-auto text-white rounded font-bold"
          disabled={Boolean(passwordError || newPasswordError || confirmPasswordError || isLoadingChange)}
        >
          Changer Mot de passe
        </button>
      </form>
    </>
  );
}
