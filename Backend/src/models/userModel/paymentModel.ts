import { model, Schema, Document, Types } from "mongoose";

export interface IPayment extends Document {
  slotId: Types.ObjectId;
  userEmail: string;
  guideId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  stripePaymentIntentId: string;
  stripeClientSecret: string;
  createdAt:Date
  updatedAt:Date
}

const PaymentSchema = new Schema({
  slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
  userEmail: { type: String, ref: 'User', required: true },
  guideId: { type:String, ref: 'guide', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  stripePaymentIntentId: { type: String },
  stripeClientSecret: { type: String }
}, { timestamps: true });

export default model<IPayment>('Payment', PaymentSchema);