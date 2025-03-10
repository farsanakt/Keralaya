import mongoose, { Schema, Document } from "mongoose";


interface IUserReview {
  email: string;
  username: string;
  comment: string;
  rating: number;
}


 export interface IReview extends Document {
  guideId: string;
  reviews: IUserReview[];
  averageRating: number;
}

const ReviewSchema = new Schema<IReview>(
  {
    guideId: { type: String, ref: "Guide", required: true },
    reviews: [
      {
        email: { type: String, required: true },
        username: { type: String, required: true },
        comment: { type: String, required: true, trim: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
    averageRating: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

 

export default mongoose.model<IReview>("Review", ReviewSchema);
