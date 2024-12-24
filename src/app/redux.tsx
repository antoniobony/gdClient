'use client'

import { useRef } from "react";

import {useDispatch,Provider,useSelector,TypedUseSelectorHook} from "react-redux"
import {setupListeners} from "@reduxjs/toolkit/query"
import { combineReducers,configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/app/state"
import authReducer from "@/app/state/authState";
import {api} from "@/app/state/api"

import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist"
import { PersistGate } from "redux-persist/integration/react";  
import createWebStorage
 from "redux-persist/lib/storage/createWebStorage";


 const createNoopStorage = () =>{
    return{
        getItem(_key:any){
            return Promise.resolve(null);
            },
        setItem(_key:any,value:any){
            return Promise.resolve(value);
        },
        removeItem(_key:any){
            return Promise.resolve();
        }
    }
} 

const storage = 
typeof window === "undefined" ?
createNoopStorage():
createWebStorage("local")

const persistConfig = {
    key:"root",
    storage,
    whitelist:["global","auth"]    
}

const  rootReducer = combineReducers({
    global:globalReducer,
    auth:authReducer,
    [api.reducerPath]:api.reducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const makeStore = ()=>{
    return configureStore({
        reducer:persistedReducer,
        middleware:(getDefault) =>getDefault({
            serializableCheck:{
                ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
                ignoredPaths: ['api.queries'],
             }
    }).concat(api.middleware),
    })
}




export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function StoreProvider({
    children
  }: {
    children: React.ReactNode
  }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
      storeRef.current = makeStore()
      setupListeners(storeRef.current.dispatch)
    }

    const   persistor = persistStore(storeRef.current);
  
    return <Provider store={storeRef.current}>
                <PersistGate loading={null} persistor={persistor}>
                {children}
                </PersistGate>
            </Provider>
  }