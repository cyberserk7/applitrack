import mongoose, { Document, Schema } from "mongoose";

export interface FeedbackType extends Document {
    userId: string;
    content: string;
}

const FeedbackSchema = new Schema<FeedbackType>({
    userId: {
        type: String,
        required: false,
        default: null
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    }   
})

const FeedbackModel = (mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema));

export default FeedbackModel;