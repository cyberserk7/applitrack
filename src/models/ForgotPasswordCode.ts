import mongoose, { Document, Schema } from "mongoose";

export interface ForgotPasswordCode extends Document {
    code: string;
    userId: string;
    createdAt: Date;
}

const ForgotPasswordCodeSchema = new Schema<ForgotPasswordCode>({
    code: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    },
})

const ForgotPasswordCodeModel = (mongoose.models.ForgotPasswordCode || mongoose.model("ForgotPasswordCode", ForgotPasswordCodeSchema));

export default ForgotPasswordCodeModel;