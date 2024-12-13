import jwt from "jsonwebtoken"

 export const generateAcessToken=(user:{id:string})=>{

    const secret=process.env.JWT_ACESSTOKEN

    if(!secret){

        throw new Error('access token not wroking')

    }

    return jwt.sign(user,secret,{expiresIn:'24h'})

 }



 export const generateRefreshToken=(user:{id:string})=>{

    const secret =process.env.JWT_REFRESHTOKEN

    if(!secret){

        throw new Error('refresh token not wroking')
    }

    return jwt.sign(user,secret,{expiresIn:'7 d'})

 }