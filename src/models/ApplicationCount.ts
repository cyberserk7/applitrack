import mongoose, { Document, Schema } from "mongoose";

export interface ApplicationCount extends Document {
    count: number;
}

export const ApplicationCountSchema = new Schema<ApplicationCount>({
   count: { type: Number, required: true }
});

const ApplicationCountModel = (mongoose.models.ApplicationCount || mongoose.model("ApplicationCount", ApplicationCountSchema));

export default ApplicationCountModel;