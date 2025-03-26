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
export const addLocations = async (formData: FormData) => {
    try {
     console.log('heop',formData)

      const response = await api.post('/addlocation', formData);

        
  
      return response.data; 
    } catch (error) {

      console.error('Error in addLocations API:', error)

      throw error;
    }
  };


  export const displaylocation=async()=>{

    const response=await api.get('/displayplaces')

    return response

  }


  export const editPlace=async(formData:FormData)=>{
  
   const response=  await api.post('/editlocation', formData);
  
      return response
  
  }

  const token=localStorage.getItem('accessToken')
  export const deletePlace=async(id:string)=>{

    console.log('delere',id)

    const response=await api.delete(`/deleteplace/${id}`)

    return response

  }

  export const guideDetails=async()=>{

   

    const response=await api.get('/guidedetails',{headers:{Authorization: `Bearer ${token}`}})


    return response

  }

  export const guiddeDetails = async (email: string) => {
    const response = await api.get(`/guideDetaillsee/${email}`
    );
  
    return response.data; 
  };

  export const slotmanagement=async(email:string)=>{

    const response=await api.get(`guideslots/${email}`)

    return response

  }
  


  export const updateProfile=async(guidedata:FormData)=>{

    

    const response= await api.post('/updateprofiles',guidedata)

    return response

  }

  export const guideSlot = async (dates: string[], email: string): Promise<any> => {
    console.log(dates,'jop')
    try {
      const response = await api.post("/guideslot", { dates, email });
      return response.data;
    } catch (error) {
      console.error("Error submitting guide slots:", error);
      throw error;
    }
  };

  export const allGuide=async()=>{

    try {
      

      const response=await api.get('/allguideList')

      return response

    } catch (error) {
      
    }

  }

  export const availableGuide=async(id:string)=>{

    try {

      const response=await api.get(`/availableguide/${id}`)

      return response
      
    } catch (error) {
      
    }

  }
  

  export const userBookingDetails=async(email:string)=>{

    const response =await api.get(`/userbookingDetails/${email}`)

    return response

  }

  export const completedTravel=async(id:string)=>{

    const response=await api.post(`/completedtravel/${id}`)

    return response

  }

  export const guidelogout=async()=>{
    
      const response=await api.get('/guidelogout')
    console.log(response);
    
      return response
  
  }
  
