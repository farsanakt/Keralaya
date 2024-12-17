import jwt from "jsonwebtoken";
import { IUser } from "../models/userModel/userModel";


export const generateAcessToken = async (user: IUser) => {
  console.log("generate token", user);

  const secret = process.env.JWT_ACESSTOKEN;

  console.log(secret, "sec");

  if (!secret) {
    throw new Error("access token not working");
  }

 
  const payload = { ...user };

 
  const res = await jwt.sign(payload, secret, { expiresIn: "24h" })

  console.log("Generated Access Token:", res);

  return res;

};

export const generateRefreshToken = (user:IUser) => {
  const secret = process.env.JWT_REFRESHTOKEN;



  
  if (!secret) {
    throw new Error("refresh token not working");
  }

  const payload = { ...user };

  return jwt.sign(payload, secret, { expiresIn: "7d" });
};
