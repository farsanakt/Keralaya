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
    userSecret: string;
    paymentIntentid: string;
    locationId:string

  }) => {
    console.log("Data before sending:", data)
   
  
    const response = await api.post("/paymentconfirmation", data);
    return response.data;
  };


  export const userBookingDetails=async(email:string)=>{

    const response=await api.get(`/bookingDetails/${email}`)

    return response

  }
  

  export const postReview=async(reviewData:any)=>{

    const response=await api.post('/reviewPosting',reviewData)

    return response

  }
  

  export const fetchingReviewData=async(id:string)=>{

    const response=await api.get(`/fetchingReview/${id}`)

    return response

  }
  export const changePassword = async ({
    userId,
    currentPassword,
    newPassword,
  }: {
    userId: string;
    currentPassword: string;
    newPassword: string;
  }) => {
    console.log("Changing password for user:", userId);
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
  
    try {
      const response = await api.post('/changePassword', {
        userId, 
        currentPassword, 
        newPassword
      });
  
      return response.data; 
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  };

  export const allLocations=async()=>{

    const response=await api.get('/alllocations')

    return response

  }
  
  
  
  


// Chat Api

export const chatIdCreation=async(id:string)=>{

    const response=await api.get(`/idCreation/${id}`)

    return response

}

export const existingMessages=async(id:string)=>{

    console.log('l')

    const response=await api.get(`/existingmessages/${id}`)

    return response

}

export const cancelBooking=async(id:string)=>{

    const response=await api.post(`/cancelbooking/${id}`)

    return response

}

export const ChatDetails=async(id:string)=>{

  const response=await api.get(`/chatdetails/${id}`)

  return response

}
