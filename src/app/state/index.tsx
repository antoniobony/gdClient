import {createSlice,PayloadAction} from  "@reduxjs/toolkit"
import { RootState } from "../redux";

export interface initialStateTypes{
    isSidebarCollapsed:boolean,
    isDarkMode:boolean
}

 

const initialState : initialStateTypes ={
    isSidebarCollapsed:false,
    isDarkMode:false
}



export const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers:{
        setIsSidebarCollapsed:(state,action: PayloadAction<boolean>)=>{
            state.isSidebarCollapsed = action.payload;
        },
        setIsDarkMode: (state,action:PayloadAction<boolean>)=>{
            state.isDarkMode = action.payload
        }
    }
})

export const getDarkMode = (state:RootState): boolean => state.global.isDarkMode
export const {setIsSidebarCollapsed,setIsDarkMode} = globalSlice.actions

export default globalSlice.reducer;








