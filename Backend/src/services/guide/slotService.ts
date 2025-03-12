import { SlotRepositories } from "@/repositories/implementation/SlotRepositories";
import { GuideRepositories } from "@/repositories/implementation/guideRepositories";


export class SlotService{

    private slotRepository:SlotRepositories

    private guideRepository:GuideRepositories

    constructor(){

        this.slotRepository= new SlotRepositories()

        this.guideRepository=new GuideRepositories()

    }

    setSlotAvailability = async (email: string, dates: string[]) => {
        try {
          
          const guide=await this.guideRepository.findUserByEmail(email)

          const result = await this.slotRepository.saveAvailability(email, dates)

          if(result && guide){

            const guideId = guide._id ? guide._id.toString() : "";

            const availability=await this.slotRepository.findSlot(guideId)

            return {result,availability}

          }


          

        } catch (error) {

          console.error("Error setting slot availability:", error)

          return { message: "Failed to set availability slots" }

        }
      };

      guideSlot=async(id:string)=>{

        console.log('hhhfgfgfo',id)

        try {

            const availableSlot=await this.slotRepository.findSlot(id)

            console.log(availableSlot,'jjfggfogof')

            return availableSlot
            
        } catch (error) {

            console.log('error occur in slot service')
            
        }

      }

      slotMangagement=async(email:string)=>{

        try {

          const guide=await this.guideRepository.findUserByEmail(email)

          if(guide){

          const guideId = guide._id ? guide._id.toString() : "";

          const availability=await this.slotRepository.findSlot(guideId)

            return {guide,availability}

            

          }
          
        } catch (error) {

          console.log('error occur in slot repo')
          
        }

      }



}