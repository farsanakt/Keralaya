import { UserRepositories } from "../../repositories/implementation/UserRepositories";
import { OtpRepository } from "../../repositories/implementation/OtpRepositories";
import { MailService } from "../../utils/email.utils";
import bcrypt from "bcryptjs";
import { IOtp } from "../../models/userModel/otpModel";
import { generateAcessToken, generateRefreshToken } from "../../utils/token.util";
import { IUser } from "../../models/userModel/userModel";
import { RefreshDto } from "@/dto/userDto";
import jwt from "jsonwebtoken";
import User from "@/models/userModel/userModel"


const mailService = new MailService();

export const generateOtp = () => {

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log(otp, "this is the otp generator");

  return otp;

};

async function hashPassword(password: string): Promise<string> {

  return await bcrypt.hash(password, 10);

}

interface userData {

   username: string,email: string,

}

export class AuthService {
  

  private userRepositories: UserRepositories;

  private otpRepositories: OtpRepository;

  constructor() {

    this.userRepositories = new UserRepositories();
    this.otpRepositories = new OtpRepository();

  }

  async userSignup(username: string,email: string,password: string,confirmPassword: string): Promise<{ success: boolean; message: string }> {

    console.log("reached userSignup");

    if (password !== confirmPassword) {

      return {success: false,message: "Password and confirm password do not match"}

    }

    const existingUser = await this.userRepositories.findUserByEmail(email);


    if (existingUser && existingUser.isVerified) {

      console.log("existed already");

      return { success: false, message: "user already existed" };

    }

    if (existingUser && !existingUser.isVerified) {

      const getOtp = await this.otpRepositories.findOtpByEmail(email);

      if (getOtp) {

        console.log("22222");

        const currentTime = new Date().getTime();

        const expirationTime =new Date(getOtp.createdAt).getTime() + 5 * 60 * 1000;

        if (currentTime < expirationTime) {

          return {success: false,message: "OTP is still valid. Please verify using the same OTP." };

        } else {

          const newOtp = generateOtp()


          await this.otpRepositories.updateOtpByEmail(email, newOtp);

          await mailService.sendOtpEmail(email, newOtp);

          return {success: false, message: "OTP expired. A new OTP has been sent to your email." };

        }

      } else {

        console.log("33333");

        const newOtp = generateOtp();

        await this.otpRepositories.create({email,otp: newOtp,} as unknown as IOtp)

        await mailService.sendOtpEmail(email, newOtp);

        return {success: false,message: "No OTP found. A new OTP has been sent to your email." }

      }

    }

    console.log("ethiiiiii");

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword);

    const savedDetails = await this.userRepositories.createUser({

      username: username,
      email: email,
      password: hashedPassword,

    })
    console.log(savedDetails, "de");

    const newOtp = generateOtp();

    console.log(newOtp);

    await this.otpRepositories.createOtp({  email, otp: newOtp,} as unknown as IOtp)

    await mailService.sendOtpEmail(email, newOtp);

    return { success: true, message: "user created" };

  }



  async verifyUserOtp(otpdata: {email: string;otpData: string;}): Promise<{ success: boolean; message: string }> {

    console.log("hey");

    const { email, otpData } = otpdata;

    console.log("emai and otp", email, otpData);

    console.log(otpData, "oypdata");

    const validUser = await this.userRepositories.findUserByEmail(email);

    console.log(validUser, "validuser");

    if (!validUser) {

      return { success: false, message: "this email is not registered" };

    }

    const currentOtp = await this.otpRepositories.findOtpByEmail(email);

    console.log(currentOtp, "currentop");

    if (!currentOtp?.otp) return { success: false, message: "resend the otp" };

    if (currentOtp.otp == otpData) {

      console.log("heeey");

      await this.userRepositories.verifyUser(email, true);

      await this.otpRepositories.deleteOtpByEmail(email);

      return { success: true, message: "otp verification completed" };

    } else {

      console.log("wrong")

      return { success: false, message: "please enter valid otp" }

    }

  }

  async resendOtp(resendOtpdata:{email:string}){

    const email=resendOtpdata.email

    const otp=generateOtp()

    try {

      const existingEmail=await this.otpRepositories.findOtpByEmail(email)

      if(existingEmail){

       await this.otpRepositories.updateOtpByEmail(email,otp)

      }
      else{

        await this.otpRepositories.create({email,otp} as IOtp)

        console.log('new otp created',otp)

      }

      await mailService.sendOtpEmail(email,otp)

      return {success:true,message:'new Otp is sended'}

      
    } catch (error) {

      return {success:false,message:'failed to resend otp'}
      
    }

  }

  

  async userLogin(userData:{email:string,password:string}):Promise<{success:boolean,message:string,data?:userData,accessToken?:string,refreshToken?:string}>{

    const {email,password}=userData

    const existingUser=await this.userRepositories.findUserByEmail(email)

    if(!existingUser ){

     return {success:false,message:'invalid credinational'}
    
    }

    const  validPassword=await bcrypt.compare(password,existingUser.password) 


    if(!validPassword){

      return {success:false,message:'wrong password'}

    }

    if(existingUser && existingUser.isBlocked ){

      return {success:false,message:'the user is blocked'}
    }

    const userDataa : userData = {
      
      username:existingUser.username,
      email:existingUser.email

    }

    const { ...data} = existingUser;

    const accessToken= await generateAcessToken(data as IUser)

    const refreshToken=await generateRefreshToken(existingUser)

    return {success:true,message:'logged successfully',data:userDataa,accessToken,refreshToken}

  }

  async forgetPass(forgetPass:{email:string}){

    const email=forgetPass.email

    try {

      const existing=await this.userRepositories.findUserByEmail(email)

      if(!existing){

        return {success:false,message:'Please enter a valid email'}

      }

      const otp=generateOtp()

      await this.otpRepositories.create({email,otp} as IOtp)

      await mailService.sendOtpEmail(email,otp)

      return {success:true,message:'Otp sended to registered mail'}
      
    } catch (error) {

      return {success:false,message:'failed to send otp '}
      
    }

  }

  async resetPass(resetPass:{newPass:string,email:string}):Promise<{success:boolean,message:string}>{

    const newPass=resetPass.newPass

    const email=resetPass.email

    try {

      const existingUser=await this.userRepositories.findUserByEmail(email)

      const hashedPassword=await bcrypt.hash(newPass,10)

      const changedPass=await this.userRepositories.UpdatePassword(email,'password',hashedPassword)

      if (!changedPass) {

        return { success: false, message: "failed to update the password" }

    }

    return { success: true, message: "password successfully changed" }

      
    } catch (error) {

     return {success:false,message:'Something went wrong'}
      
    }

  }
  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userRepositories.findUserById(userId);
  
    if (!user) {
      return { success: false, message: "User not found" };
    }
  
    const isMatch = await bcrypt.compare(currentPassword, user.password);
  
    if (!isMatch) {
      return { success: false, message: "Current password is incorrect" };
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepositories.updatePassword(userId, hashedPassword);
  
    return { success: true, message: "Password successfully changed" };
  }
  

  async checkToken(refreshDto: RefreshDto) {
    try {
      const token = refreshDto.token;

      console.log('authtolen',token)
  
      const secret = process.env.JWT_REFRESHTOKEN;
      if (!secret) {
        return { success: false, message: "Internal Server Error" };
      }
      console.log(secret,'sece')
  
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      
      console.log(decoded,decoded._id,'ide')
  
      if (decoded && decoded._id) {
       
        const user = await User.findById(decoded._id).lean()
  
        if (!user) {
          return { success: false, message: "User not found" };
        }

        console.log(user,'user')
  
        const newAccessToken = await generateAcessToken(user as IUser)

        console.log(newAccessToken,'newww')
  
        return {
          success: true,
          message: "New token created",
          accessToken: newAccessToken,
        };
      }
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return { success: false, message: "Refresh token expired, please log in again" };
      }
      console.error("Error verifying refresh token:", error);
      return { success: false, message: "Invalid refresh token" };
    }
  }
  
  
}
