import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux";

export type userType={
    id:string | null,
    role:string | null,
    token:string | null
    poste?:string | null
}

const initialState:userType={
    id:null,
    role:null,
    token:null,
    poste:null
}



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<userType>) => {
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.role = action.payload.role;
            state.poste = action.payload.poste;
        },
        clearToken: (state) => {
            state.token = null;
            state.id = null;
            state.role = null;
            state.poste = null;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;

export const getToken = (state: RootState): string | null => state.auth.token;
export const getRole = (state:RootState): string | null => state.auth.role;
export const getPoste = (state:RootState): string | null|undefined=> state.auth.poste;
export const getId = (state:RootState): string | null => state.auth.id;/*
import { useAppSelector } from "@/app/state/store";
import { getToken } from "@/app/state/authSlice";

const token = useAppSelector(getToken);

console.log("Token:", token); // Affichez le token ou utilisez-le selon vos besoins


import { useAppDispatch } from "@/app/state/store";
import { setToken, clearToken } from "@/app/state/authSlice";

const dispatch = useAppDispatch();

// Pour définir le token
dispatch(setToken("votre_token"));

// Pour effacer le token
dispatch(clearToken());



*/