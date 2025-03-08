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

    return response

}

export const searchlocation=async(query:string)=>{

    const response = await api.get('/searchlocation', {
        params: { query }
      });

    return response

}

export const searchResult=async(placeid:string)=>{

    const response=await api.get('/singlelocation',{params:{placeid}})

    return response

}

export const getLocation=async(input:string)=>{

    const response = await api.get('/getlocation', {
        params: { input }, 
      });

    return response

}

export const getLocationDetails=async(id:string)=>{

    const response=await api.get('/locationdetails',{params:{id}})

    return response

}

export const getGuideDetails=async(district:string )=>{

    console.log(district,'d')
    
    const response = await api.get('/guidedetails', { params: { district } });

    return response

}

export const singleGuidee=async(id:string)=>{

    console.log('jkjk')

    const response=await api.get(`/singleguidee/${id}`)

    return response

}

export const usercheckOut = async (data: { slotId: string; guideId: string; userEmail: string; amount: string }) => {
    const response = await api.post('/createPaymentIntent', data)
    return response;
  };


  export const paymentConfirmation = async (data: {
    slotId: string;
    guideId: string;
    userEmail: string;
    amount: string;
    usersecert: string;
    paymentIntentid: string;
  }) => {
    console.log("Data before sending:", data)
  
    const response = await api.post("/paymentconfirmation", data);
    return response.data;
  };
  
  