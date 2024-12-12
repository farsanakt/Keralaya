import axios from "axios";

const API_URL = import.meta.env.VITE_USER_API_URL



const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
})

export const GuideRegisteration=async(formData:any)=>{

    console.log('gghjoofdfnfjfjjfj')

    const response=await api.post('/registration',formData)

    return response

}

export const guideLogin=async(formData:any)=>{

    const response=await api.post('/guidelogin',formData)

    return response

}
