import GuideAvailability, { IGuideAvailability } from "@/models/guideModel/slotModel"
import {Guide} from "@/models/guideModel/guideModel"
import Payment from "@/models/userModel/paymentModel";
import { IPayment } from "@/models/userModel/paymentModel";



export class SlotRepositories{


    async saveAvailability(email: string, dates: string[]): Promise<{ message: string } | null> {

        const existingGuide = await Guide.findOne({ email });
      
        if (!existingGuide) {

          return null
        }
      
        const dateStrings = dates.map(date => date.toString());
      
        let availabilityRecord = await GuideAvailability.findOne({ guideId: existingGuide._id });
      
        if (availabilityRecord) {
          availabilityRecord.availableDates = dateStrings.map((date) => ({
            date,
            isBlocked: false,  
            isBooked: false,
          }));
      
          await availabilityRecord.save();
        } else {
          availabilityRecord = new GuideAvailability({
            guideId: existingGuide._id,
            availableDates: dateStrings.map((date) => ({
              date,
              isBlocked: false,
              isBooked: false,
            })),
          });
      
          await availabilityRecord.save();
        }
      
        return { message: "Availability slots updated successfully." };
      }
      

    async findSlot(id:string):Promise<IGuideAvailability | null>{

        const availableslot=await GuideAvailability.findOne({guideId:id})

        if(!availableslot){

            return null
        }

        return availableslot

    }

    updateSlotStatus = async (guideId: string, slotId: string) => {
      return await GuideAvailability.findOneAndUpdate(
        { guideId, "availableDates._id": slotId }, 
        {
          $set: {
            "availableDates.$.isBooked": true,
            "availableDates.$.isBlocked": true
          }
        },
        { new: true } 
      );
    };

    createPayment = async (paymentData: any) => {
      const newPayment = new Payment(paymentData);
      return await newPayment.save();
    };
    
    
    

}