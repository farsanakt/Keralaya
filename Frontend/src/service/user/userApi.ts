import axios from "axios";

const API_URL = import.meta.env.VITE_USER_API_URL



const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
})



export const singUpRequest=async(formData:any)=>{

    console.log('response koduthu')

    const response=await api.post('/signup',formData)

    console.log('kiiiiiiitttiii',response)
    
    return response
}