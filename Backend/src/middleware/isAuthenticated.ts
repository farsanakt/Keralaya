import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../enums/HttpStatus'
import dotenv from 'dotenv'
dotenv.config()

export interface CustomeRequest extends Request {
    user?:  JwtPayload
    userId?: string;
}

const authenticateToken = (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization'];

        console.log(token, 'token');

        if (!token) {

            res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access denied. No token provided" });

            return
        }

      
        const newToken = token.split(' ')[1]

        console.log(newToken, 'token in doctor auth middleware');

        const secret = process.env.JWT_ACESSTOKEN

        console.log(secret, 'secret in');

        if (!secret) {

            throw new Error('Access token secret is not defined');

        }

        
        jwt.verify(newToken, secret, (err, payload) => {

            console.log('verify done ,',payload);

            if (err) {

                 res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });

                 return
            }

           const user = jwt.decode(newToken)
            req.user = user as JwtPayload; 
            console.log(req.user, 'the user before next');

            next();
        });

    } catch (error) {
        console.error('Error occurred in authenticateToken middleware', error);
        
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while authenticating' });
    }
};

export default authenticateToken

