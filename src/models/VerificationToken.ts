import mongoose, { Document, Schema } from "mongoose";

export interface VerificationToken extends Document {
    userId: string;
    expiryDate: Date;
}

const VerificationTokenSchema = new Schema<VerificationToken>({
    userId: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
        default: new Date(Date.now() + 3600000)
    },
})

const VerificationTokenModel = (mongoose.models.VerificationToken || mongoose.model("VerificationToken", VerificationTokenSchema));

export default VerificationTokenModel;

