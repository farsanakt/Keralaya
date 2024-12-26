import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'


interface PublicRouteProps{
    children:React.ReactNode
}

const PublicRoute  :React.FC<PublicRouteProps>=({children})=>{
    

    const isAuthenticated=useSelector((state:any)=>state.user.isAuthenticated);

    console.log('public route',isAuthenticated);


    return isAuthenticated ? <Navigate to='/' /> : <> {children} </>
}

   


export default PublicRoute
