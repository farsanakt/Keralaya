import { GuideRepositories } from "../../repositories/implementation/guideRepositories";
import { guideRegisterDto } from "../../dto/authGuideDto";
import { hashpassword } from "../../utils/passwordUtils";
import bcrypt from "bcryptjs";


import { generateAcessToken, generateRefreshToken } from "../../utils/guideToken.util";

export class AuthService {

  private guideRepository: GuideRepositories;

  constructor() {

    this.guideRepository = new GuideRepositories()

  }

  async guideRegistration(

    guideDto: guideRegisterDto

  ): Promise<{ success: boolean; message: string}> {

    try {

      const { name, email, password, experience, expertise, languages,district } =guideDto;


      const existingGuide = await this.guideRepository.findUserByEmail(email);

      if (existingGuide) {

        return { success: false, message: "Guide already existed" };

      }

     
     

      const hashedpassword = await hashpassword(password);


      const guideSave = await this.guideRepository.createUser({
       ...guideDto,
       password:hashedpassword
      });

      return { success: true, message: "guide registration completed" }

    } catch (error) {

      return { success: false, message: "something went wrong" }

    }
  }
 
  async guideLogin(guideData: {
    email: string
    password: string
  }): Promise<{ success: boolean; message: string,accessToken?:string,refreshToken?:string  }> {

    const { email, password } = guideData;

    try {

      const existingGuide = await this.guideRepository.findUserByEmail(email)

      if(existingGuide?.isBlocked){

        return {success:false,message:'Your request is not approved'}

        
      }

      if (!existingGuide) {

        return { success: false, message: "Guide not found, please register" }

      }

      if (

        typeof password !== "string" ||

        typeof existingGuide.password !== "string"

      ) {

        throw new Error("Invalid password format");

      }

      const validPassword = await bcrypt.compare(password, existingGuide.password);

      if (!validPassword) {

          return { success: false, message: 'Wrong password' };

      }

      const accessToken=await generateAcessToken(existingGuide)

      const refreshToken=await generateRefreshToken(existingGuide)

      return { success: true, message: "Logged in successfully" ,accessToken,refreshToken};

    } catch (error) {

      console.error("Error during login:", error);

      return { success: false, message: "An error occurred during login" };

    }
  }
}
