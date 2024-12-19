import { userAxiosInstance } from "../axiosInstance/userInstance";
// const API_URL = import.meta.env.VITE_USER_API_URL



const api=userAxiosInstance



export const singUpRequest=async(formData:any)=>{

    console.log('response koduthu')

    const response=await api.post('/signup',formData)

    console.log('kiiiiiiitttiii',response)
    
    return response
}

export const verifyOtp=async(otpData:string,email:string)=>{


    console.log(otpData,'nyyeyeyey')

    const response=await api.post('/verifyOtp',{ otpData,email})

    console.log(response,'ansal')

    return response

}

export const resendOtp=async(email:string)=>{

    const response=await api.post('/resendotp',{email})

    return response

}

export const forgetPass=async(email:string)=>{

    const response=await api.post('/forgetpass',{email})

    return response

}

export const resetPass=async(newPass:string,email:string)=>{

    const response=await api.post('/resetPass',{newPass,email})

    return response

}

export const loginRequest=async(email:string,password:string)=>{

    console.log('jjjjj')

    const response =await api.post('/login',{email,password})

    console.log('loop')

    console.log(response,'kkkk')

    return response

}

export const profileRequest=async(email:string)=>{

    console.log('jj')

    const response=await api.get(`/userProfile/${email}`)

    return response

}

export const updateProfie=async(updateddata:{username:string,email:string,id:string})=>{

    const response=await api.post('/updateprofile',{updateddata})

    return response

}


export const userlogout=async()=>{

    const response=await api.get('/logout')

    if(!response){



    }

    return response

}