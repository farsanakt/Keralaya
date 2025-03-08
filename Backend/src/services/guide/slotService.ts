import { SlotRepositories } from "@/repositories/implementation/SlotRepositories";


export class SlotService{

    private slotRepository:SlotRepositories

    constructor(){

        this.slotRepository= new SlotRepositories()

    }

    setSlotAvailability = async (email: string, dates: string[]) => {
        try {
          
         
          console.log('hjfdjjfdj')
          const result = await this.slotRepository.saveAvailability(email, dates)

          return result

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



}