import { Request,Response ,NextFunction} from "express"
import { HttpStatus } from "../enums/HttpStatus"
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"

export interface CustomeRequest extends Request {
    user?:  JwtPayload
    userId?: string;
}



const authenticateToken=(req:CustomeRequest ,res:Response,next:NextFunction)=>{

try {

    const token=req.headers['authorization']

    if(!token){

        res.status(HttpStatus.UNAUTHORIZED).json({message:'no token provided'})

        return

    }

    const newToken=token?.split(' ')[1]

    const secret=process.env.JWT_ACESSTOKEN

    const decodedToken = jwt.decode(newToken, { complete: true });


    if (!secret) {
        throw new Error('Access token secret is not defined')
    }
    jwt.verify(newToken, secret, (err, user) => {
       

        if (err) {


            return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
        }
        req.user = decodedToken?.payload as JwtPayload;
        console.log(req.user);
        
        
        
        console.log(req.user,'the user before next');
        
        next()
    })

    
} catch (error) {

  console.log('error occur in authenicating token')
    
}

}


export default authenticateToken