import { createSlice } from "@reduxjs/toolkit";



const initialState:GuideState={

    currentGuide: null,
    loading:false,
    error:false,
    isAuthenticated:false,

}

interface Guide {
    message: any;
    data: Guide| null;
    _id: string;
    name: string;
    email: string;
    
  }
  

  interface GuideState {
    currentGuide: Guide | null;
    loading: boolean;
    error: boolean;
    isAuthenticated:boolean
  }


const guideReducer=createSlice({

    name:'guide',
    initialState,
    reducers:{

        loginStart:(state)=>{

            state.loading=true

        },
        loginSuccess:(state,action)=>{

            state.currentGuide=action.payload
            state.isAuthenticated=true
            state.error=false
            state.loading=false

        },
        loginFailed:(state,action)=>{

            state.loading=false

            state.error=action.payload

        },
        logout:(state)=>{

            state.currentGuide=null

            state.isAuthenticated=false

        },
        
    }


})

export const {loginStart,loginFailed,loginSuccess,logout}=guideReducer.actions

export default guideReducer.reducer