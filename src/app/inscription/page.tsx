"use client"
import React, { ChangeEvent, ChangeEventHandler, createRef, MouseEvent, useState } from "react"
import TextAreaField from "../(component)/Field/TextAreaField"
import Field from "../(component)/Field/Fields"
import Selects from "../(component)/Select/Select"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Password, Visibility, VisibilityOff } from "@mui/icons-material"
import dayjs, { Dayjs } from "dayjs"
import { poste, responseSignIn, useGetPosteQuery, useRegisterMutation } from "../state/api"
import PopupPersonnel from "../(component)/popup/popupPersonnel"
import { CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import FieldPassword from "../(component)/Field/FieldsPassword"
import Error from "../(component)/Error/Error"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setToken, userType } from "../state/authState"
import Cookies from 'js-cookie';
import Image from "next/image"
import TypewriterEffect from "./typeEffect"

export default function Signup() {
    const [userRegister,{error:errorUserRegister,isLoading:isLoadingUserRegister}] = useRegisterMutation()

    const router = useRouter()
    const dispatch = useDispatch()

    const [error, setError] = useState<string>("");
    const [WizardForm,setWizardForm] = useState<number>(1)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [poste,setPoste] = useState<string>("")
    const [role,setRole] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();
    
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();
    
    const [user,setUser] = useState({
        adresse:"",
        nom:"",
        prenom:"",
        cin:"",
        password:"",
        confirmPassword:"",
        phone:"",
        email:""
    })

    const sexe = createRef<HTMLSelectElement>()
    const handleDateChange = (newDate: Dayjs | null) => {
        setSelectedDate(newDate);
      };

    const validateField = (name: string, value: React.SetStateAction<string>) => {
        const newErrors: Record<string, string> = { ...errors };

        if (name === "cin") {
          if (!/^\d{12}$/.test(value.toString())) {
            newErrors[name] = "Le CIN doit contenir exactement 12 numéro.";
          } else {
            delete newErrors[name];
          }
        }
        else if(name === "email"){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.toString())) {
                newErrors[name] = "Veuillez saisir un email valide";
              } else {
                delete newErrors[name];
              }
        }
        else if(name === "phone"){
            const phoneRegex = /^\d{10}$/;
            if(!phoneRegex.test(value.toString())){
                newErrors[name] = "Veuillez saisir un numéro valide";
            }else{
                delete newErrors[name]
            }
        }
        else if(name === "password"){
            if(value.toString().length < 6){
                newErrors[name] = "Veuillez saisir un mot de passe supérieur ou égale à 6";
            }else{
                delete newErrors[name]
            }
        }

        setErrors(newErrors);

      };

    const Change = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setUser((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value
      }));
    };
    
    const handleNext = (e:any) => {
        const newErrors: Record<string, string> = { ...errors };
        e.preventDefault()
        let next = true
        if(WizardForm == 1){
            if (!user.nom.trim()) {
                newErrors["nom"] = "Veuillez remplir le champ"; 
                setErrors(newErrors);
                next = false;
            }
            if (!user.prenom.trim()) {
                newErrors["prenom"] = "Veuillez remplir le champ"; 
                setErrors(newErrors);
                next = false;
            }
            if (!user.phone.trim()) {
                newErrors["phone"] = "Veuillez remplir le champ"; 
                setErrors(newErrors);
                next = false;
            }
            if (!user.adresse.trim()) {
                newErrors["adresse"] = "Veuillez remplir le champ"; 
                setErrors(newErrors);
                next = false;
            }
            if (!user.cin.trim()) {
                newErrors["cin"] = "Veuillez remplir le champ"; 
                setErrors(newErrors);
                next = false;
            }
        }      
        else{

        }
        if(next){
            setWizardForm(c=>c+1)
        }
    }

    const add =async ()=>{
        alert("daza")
        try{
        
            const res:responseSignIn = await userRegister({
                  nom:user.nom as string,
                  prenom:user.prenom,
                  email:user.email,
                  phone:user.phone,
                  sexe:sexe.current?.value,
                  adresse:user.adresse,
                  password:user.password,
                  dateNaissance:selectedDate?.toISOString() as string,
                  role:role,
                  poste: role === "PERSONNEL" ? poste  : null,
                  cin:user.cin
              }).unwrap()
  
              const USER:userType= {
              id:res.id,
              role:res.role,
              token:res.token ,
              poste:res.poste?.designation,
              }
              
              Cookies.set('token', USER.token as string, { expires: 7 ,secure:true})
              Cookies.set('email', res.email as string, { expires: 7,secure:true })
              Cookies.set('id', USER.id as string, { expires: 7 ,secure:true})
              Cookies.set('role',USER.role as string, { expires: 7 ,secure:true})
              Cookies.set('poste',USER.poste as string, { expires: 7 ,secure:true})
              
              dispatch(setToken(USER))
              
          if(role === "PERSONNEL"){
              router.push(`/ticket/${USER.id}/${USER.poste ==="Agent" ?"niveau1" : USER.poste === "DirecteurES" ? "niveau2": 
                USER.poste ==="Opérateur"? "niveau4":"niveau3"}`)
              }
          else{
              router.push("/home")
          }
          }catch(e:any){
              console.log(e)
          }
    }

    const handleBack =(e:any) => {
        e.preventDefault()
        setWizardForm(c=>c-1)
    }

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        const newErrors: Record<string, string> = { ...errors };
        if(user.confirmPassword !== user.password ){
            newErrors["confirmPassword"] = "Veuillez saisir le correcte mot de passe";
        }else{
            add()
            delete newErrors["confirmPassword"]
        }
    }

    
    const words = [
        {
          text: "Inscription",
        },
        {
          text: "à la",
        },
        {
          text: "plateforme",
        },
        {
          text: "SHS",
        },
        {
          text: "App.",
          className: "text-blue-600 dark:text-blue-600",
        },
        
      ];
      

    return(  <div className="h-full flex flex-col mx-auto bg-white md:flex-row">
                <div className="relative md:min-w-[300px] md:p-12 mx-auto space-y-10 md:space-y-20">
                    {/*<div className="font-extrabold text-black-500  pl-10 text-center scale-110  text-xl"><span className="text-blue-600 font-extrabold text-2xl">Société Hydroéléctricité</span> Sahofika</div>*/}
                        <div className="flex-row sm:ml-10">
                            <div className="flex flex-row space-x-96  ">
                                <div className="space-x-3 space-y-3">
                                    <Image  src="/assets/ade.png" alt="a" width={60}   height={50} />
                                    <span className={`after:content-[''] bg-blue-primary after:absolute text-white after:bg-blue-primary relative after:transition-all after:ease-in-out after:duration-500 md:after:left-10 after:top-5 after:left-4 w-[40px] h-[40px] flex items-center mr-4 justify-center border-solid  rounded-full  
                                    ${WizardForm > 1 ? " after:w-[2px] after:h-16 md:after:w-[400px] md:after:h-[5px]":"md:after:w-[0px] md:after:h-0"}`} ><h1 className="font-extrabold">1</h1>
                                    </span>
                                </div>
                                <div className="space-x-3 space-y-3">
                                    <Image  src={`/assets/${WizardForm >= 2 ? "ade.png":"ade1.png"}`} alt="a" width={60}   height={50} />
                                    <span className={`after:content-[''] ${WizardForm >= 2 ? "bg-blue-primary":"bg-gray-300"} after:absolute text-white after:bg-blue-primary relative after:transition-all after:ease-in-out after:duration-500 md:after:left-10 after:top-5 after:left-4 w-[40px] h-[40px] flex items-center mr-4 justify-center border-solid  rounded-full  
                                    ${WizardForm > 2 ? " after:w-[2px] after:h-16 md:after:w-[400px] md:after:h-[5px]":"md:after:w-[0px] md:after:h-0"}`} ><h1 className="font-extrabold">2</h1>
                                    </span>
                                </div>
                                <div className="space-x-3 space-y-3">
                                    <Image  src={`/assets/${WizardForm > 2 ? "ade.png":"ade1.png"}`} alt="a" width={60}   height={50} />
                                    <span className={`${WizardForm >2 ? "bg-blue-primary":"bg-gray-300"} text-white relative w-[40px] h-[40px]  flex items-center mr-4 justify-center  border-solid  rounded-full`}><h1 className="font-extrabold">3</h1>
                                </span>
                                </div>          
                            </div>
                            <div className=" flex flex-row space-x-96 mt-5 ">
                                <div><p className="font-bold">Information personnel</p></div>
                                <div><p className="font-bold">Role </p></div>
                                <div><p className="font-bold">Mot de passe</p></div>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <TypewriterEffect words={words}/>
                                <div className="w-[750px]">   
                                    <p className="font-bold fontF text-xl text-gray-800">Inscrivez-vous sur SHS App en trois étapes simples :<br/> commencez par remplir 
                                     vos **informations personnelles**,<br/> sélectionnez ensuite votre **rôle**, <br/>
                                    et terminez en fournissant vos **informations confidentielles** pour sécuriser votre compte
                                    </p>
                                </div>
                            </div>
                            <Image src="/assets/avatar/avatar2.png" alt="sary" width={300} height={300}/>
                        </div>
                    
                </div>
                    <form className="w-[500px]  h-[750px] scale-105 shadow-lg border-2 border-blue-primary border-solid rounded-3xl mt-10 p-10 mx-auto " onSubmit={handleSubmit}>                                   
                                <div className={`space-y-5 ${WizardForm != 1 ?"hidden" :""} mx-auto  flex flex-col`}>
                                    <Image className="mx-auto" src="/assets/logo1.png" alt="sary" width={50} height={50}/>
                                    <p className="font-extrabold text-2xl mx-auto text-blue-700 scale-105">Information personnel</p>
                                    <Field required error={!!errors.nom} errorText={errors.nom} type="text" name="nom" onChange={Change} placeholder="Votre nom"/>
                                    <Field  required error={!!errors.prenom} errorText={errors.prenom} type="text" name="prenom"  onChange={Change} placeholder="Votre prenom"/>
                                    <Selects data={["Masculin","Féminin"]} label="Sexe"  name="sexe" ref={sexe} defaultValue={"Masculin"}/>
                                    <Field required error={!!errors.cin} errorText={errors.cin} type="text" name="cin"  placeholder="Votre Cin" onChange={Change}/>
                                    <Field required error={!!errors.phone} errorText={errors.phone} type="text" name="phone"  placeholder="Votre numéro téléphonique" onChange={Change}/>
                                    <Field required error={!!errors.adresse} errorText={errors.adresse} type="text" name="adresse"  placeholder="Votre adresse" onChange={Change}/>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker
                                            name="dateNaissance"
                                            label="Votre date de Naissance"
                                            onChange={handleDateChange}  
                                            value={selectedDate}
                                        
                                            className="w-[500px]"
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className={`space-y-5 ${WizardForm != 2 ?"hidden" :""} animate-fadeIn mb-36`}>
                                    <p className="font-extrabold text-xl mx-auto text-blue-700 scale-105">Role</p>
                                    <div className="flex flex-row space-x-5 mx-10">
                                <div>
                                    <Image
                                    className={`border-2 ${role ==="PERSONNEL" ?"border-solid border-2 border-blue-primary":""} rounded-2xl`}
                                    src="/assets/avatar/personnel.png"
                                    alt="personnel"
                                    width={100}
                                    height={100}
                                    />
                                    <PopupPersonnel onClick={(poste)=>{ setPoste(poste)}}>
                                    <div className="flex flex-col">
                                        <h1>PERSONNEL</h1>
                                        <input
                                        type="radio"
                                        name="role"
                                        value="PERSONNEL"
                                        onClick={() => setRole("PERSONNEL")}
                                        />
                                    </div>
                                    </PopupPersonnel>
                                </div>
                                <div>
                                    <Image
                                    className={`border-2 rounded-2xl ${role ==="ADMIN" ?"border-solid border-2 border-blue-primary":""}`}
                                    src="/assets/avatar/admin.png"
                                    alt="admin"
                                    width={100}
                                    height={100}
                                    />
                                    <div className="flex flex-col">
                                    <h1>ADMIN</h1>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="ADMIN"
                                        onClick={() => setRole("ADMIN")}
                                    />
                                    </div>
                                </div>
                                </div>

                                </div>
                                <div className={`space-y-5 mb-72  flex flex-col ${WizardForm != 3 ?"hidden" :""} animate-fadeIn`} >
                                    <p className="font-extrabold text-xl mx-auto text-blue-700 scale-105 mb-24">Sécurité</p>
                                        <Field 
                                        type='text'
                                        placeholder="Email "
                                        value={user.email}
                                        onChange={Change}
                                        error={!!errors.email}
                                        errorText={errors.email}
                                        name="email"
                                        required
                                        />
                                    <FieldPassword
                                        label="Entrer le mot de passe"
                                        showPassword={showPassword}
                                        password={user.password}
                                        handlePasswordChange={Change}
                                        handleClickShowPassword={handleClickShowPassword}
                                        handleMouseDownPassword={handleMouseDownPassword}
                                        passwordError={errors.password}
                                    />
                                    <FieldPassword
                                        name="confirmPassword"
                                        label="Confirmer le mot de passe"
                                        showPassword={showConfirmPassword}
                                        password={user.confirmPassword}
                                        handlePasswordChange={Change}
                                        handleClickShowPassword={handleClickShowConfirmPassword}
                                        handleMouseDownPassword={handleMouseDownConfirmPassword}
                                        passwordError={errors.confirmPassword}
                                    />
                                </div>
                                <div className="flex flex-row space-x-2 ">
                                        <button disabled={WizardForm == 1} onClick={handleBack} className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                                        ${WizardForm == 1 ?"bg-gray-400" :"bg-blue-primary"} px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 `}>Retour</button>
                                        <button disabled={WizardForm == 3 || !!errors.nom || !!errors.prenom || role == null || !!errors.cin || !!errors.sexe || !!errors.phone || selectedDate == null}  onClick={handleNext}  className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                                        ${WizardForm == 3 ?"bg-gray-400" :"bg-blue-primary"} px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 `}>Suivant</button>
                                        <button disabled={WizardForm != 3 || !!errors.confirmPassword || !!errors.password || !!errors.email} type="submit" className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent 
                                        ${WizardForm != 3 || !!errors.confirmPassword || !!errors.password || !!errors.email ?"bg-gray-400":"bg-blue-primary"} px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 
                                    `}>
                                        {"S'inscrire"}
                                        </button>
                                </div>
                                <a className="mx-auto underline text-sky-500" href="/connexion">Vous avez déjà une compte?Se connecter</a>
                    </form>
        </div>
    )
  }