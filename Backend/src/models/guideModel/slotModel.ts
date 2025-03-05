import mongoose,{Document,Schema} from "mongoose"

export interface IGuideAvailability extends Document{

    guideId:string,
    availableDates:Date[],
    createdAt: Date;


}


const GuideAvailabilitySchema: Schema = new Schema(
    {
      guideId: {
        type: String,
        ref: 'User',
        required: true
      },
      availableDates: {
        type: [Date],
        required: true
      }
    },
    {
      timestamps: true
    }
  );


  export default mongoose.model<IGuideAvailability>('GuideAvailability', GuideAvailabilitySchema);

