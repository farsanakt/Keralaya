import { createSlice} from "@reduxjs/toolkit";

const initialState:UserState={

    currentUser: null,
    loading:false,
    error:false

}

interface User {
    message: any;
    data: User | null;
    _id: string;
    name: string;
    email: string;
    
  }
  

  interface UserState {
    currentUser: User | null;
    loading: boolean;
    error: boolean;
  }
  



const userReducer=createSlice({

    name: 'user',
    initialState,

    reducers:{

        loginStart:(state)=>{

            state.loading=true

        },
        loginSuccess:(state,action)=>{

            state.currentUser=action.payload

            state.loading=false

            state.error=false

        },
        loginFailure:(state,action)=>{



            state.loading=false

            state.error=action.payload

        }



    }
})


export const {loginStart,loginFailure,loginSuccess}=userReducer.actions

export default userReducer.reducer