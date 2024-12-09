import { IGuide } from "../../models/guideModel/guideModel";

export interface IGuideRepository{


 createUser(userdata:any):Promise<any>

}