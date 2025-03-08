import mongoose, { Document, Schema } from "mongoose";

export interface IDateAvailability {
  date: string;
  isBlocked: boolean;
  isBooked: boolean;
}

export interface IGuideAvailability extends Document {
  guideId: mongoose.Schema.Types.ObjectId;
  availableDates: IDateAvailability[];
  createdAt: Date;
  updatedAt: Date;
}

const GuideAvailabilitySchema: Schema = new Schema(
  {
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
      required: true,
    },
    availableDates: [
      {
        date: {
          type: String,
          required: true,
        },
        isBlocked: {
          type: Boolean,
          default: false,
        },
        isBooked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true, 
  }
);


  export default mongoose.model<IGuideAvailability>('GuideAvailability', GuideAvailabilitySchema);

