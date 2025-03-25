import User, { IUser } from "@/models/userModel/userModel";
import { UpdateProfileDto } from "@/dto/userDto";
import { ILocation} from "@/models/guideModel/placeModel";
import Location from "@/models/guideModel/placeModel"
import { Guide, IGuide } from "@/models/guideModel/guideModel";
import BookingModel, { IBooking } from "@/models/userModel/BookingModel";
import ReviewModel from "@/models/userModel/reviewModel";
import reviewModel from "@/models/userModel/reviewModel";
import { IReview } from "@/models/userModel/reviewModel";



export class UserRepositories {

    async createUser(data:any):Promise <IUser | null>{
        return await User.create(data)
    }

    async findUserByEmail(email:String) :Promise <IUser | null>{

        const data = await User.findOne({email})
        const userdata = data?.toObject()

        console.log(userdata);
        
     
          return userdata as IUser
    }

    async findUserById(id:string) : Promise <IUser | null >{
        return await User.findById(id)
    }

    async verifyUser(email: string, isVerified: boolean): Promise<IUser | null> {
       
        await User.updateOne({ email }, { isVerified });
        return await User.findOne({ email });
    }

    async UpdatePassword(email:string,field:string,value:any) :Promise<IUser | null>{
        const update={$set:{[field]:value}}
        return await User.findOneAndUpdate({email},update,{new:true})
    }

      async updateProfile(userId:string,updateProfileDto:UpdateProfileDto) : Promise<IUser | null>{

        return await User.findByIdAndUpdate(
            userId,
            {$set:updateProfileDto},
            {new:true}
            
        )
    }

    async getLocations(district: string): Promise<ILocation[] | null> {

        try {

          const places = await Location.find({ district: { $regex: new RegExp(district, "i") } })

          return places

        } catch (error) {

          console.error("Error fetching locations:", error)

          return null;

        }
      }

      async findLocationById(id:string) : Promise <ILocation | null >{
        return await Location.findById(id)
    }


    
    async getGuide(district: string): Promise<IGuide[] | null> {

      try {

        const places = await Guide.find({ district: { $regex: new RegExp(district, "i") } })

        return places

      } catch (error) {

        console.error("Error fetching locations:", error)

        return null;

      }
    }

    async allGuide():Promise<IGuide[] |null >{

      return Guide.find()

    }

    async singleguide(id:string):Promise<IGuide[]|null>{

      try {
        const guide=await Guide.find({_id:id})
        
        if(guide){

          return guide
        }

        return null
        
      } catch (error) {

        console.error("Error fetching guide:", error);

        return null;
        
      }

    }

    async findBookingDetails(email:string):Promise<IBooking[]| null>{

      return await BookingModel.find({userEmail:email})

    }

    async findBookingDetailsById(id:string):Promise<IBooking|null>{

      return await BookingModel.findOne({_id:id})

    }

    async saveReview(reviewData: { guideId: string; email: string; username: string; rating: number; comment: string }) {
      try {
        const { guideId, email, username, rating, comment } = reviewData;
    
        const existingReview = await ReviewModel.findOne({ guideId, "reviews.email": email });
    
        if (existingReview) {
          return { success: false, message: "You have already submitted a review for this guide." };
        }
    
        let review = await ReviewModel.findOne({ guideId });
    
        if (!review) {
         
          review = new ReviewModel({
            guideId,
            reviews: [{ email, username, comment, rating }],
            averageRating: rating, 
          });
        } else {
         
          review.reviews.push({ email, username, comment, rating });
    
          const totalRatings = review.reviews.length;
          const totalScore = review.reviews.reduce((sum, r) => sum + r.rating, 0);
          review.averageRating = totalScore / totalRatings;
        }
    
        await review.save();
        return { success: true, message: "Review added successfully", review };
      } catch (error) {
        console.error("Database error:", error);
        return { success: false, message: "Database error" };
      }
    }

    async findGuideReview(id:string):Promise<IReview | null>{

      return await reviewModel.findOne({guideId:id})
      
    }

    async findById(id:string):Promise<IBooking| null>{

      return await BookingModel.findById({userEmail:id})

    }

    async updateBookingStatusById(id:string):Promise<IBooking|null>{

      return BookingModel.findByIdAndUpdate({_id:id},{status:'cancelled'})

    }
    
      

}