import axios from "axios";

const API_URL = import.meta.env.VITE_USER_API_URL



const api=axios.create({
    baseURL:API_URL,
    withCredentials:true
})


export const loginRequest=async(email:string,password:string)=>{

    const response=await api.post('/loginn',{email,password})

    return response

}


export const userlist=async()=>{

    const response =await api.get('/userlist')

    return  response

}

export const guidelist=async()=>{

    const response=await api.get('/guidelisit')

    return response

}

export const updateUserStatus=async(userId:string)=>{

    const response=await api.patch(`/updateUser/${userId}`)

    return response

}

export const updateGuideStatus=async(guideId:string)=>{

    const response=await api.patch(`/updateguide/${guideId}`)

    return response

}


export const displayLocations=async()=>{

    const response=await api.get('/displayplaces')

    return response

}

export const editPlace=async(formData:FormData)=>{

    const response =await api.post('/editlocation',formData)

    return response

}