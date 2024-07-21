import mongoose, { Document, Schema } from "mongoose";

export interface ForgotPasswordCode extends Document {
    code: string;
    userId: string;
    expiryDate: Date;
}

const ForgotPasswordCodeSchema = new Schema<ForgotPasswordCode>({
    code: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    expiryDate: {
        type: Date,
        required: true,
        default: new Date(Date.now()+360000),
    },
})

const ForgotPasswordCodeModel = (mongoose.models.ForgotPasswordCode || mongoose.model("ForgotPasswordCode", ForgotPasswordCodeSchema));

export default ForgotPasswordCodeModel;