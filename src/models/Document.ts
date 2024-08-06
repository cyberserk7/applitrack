import mongoose, { Document, Schema } from "mongoose";

export interface DocumentType extends Document {
    url: string;
    title: string;
    type: string;
    userId: string;
}

const DocumentSchema = new Schema<DocumentType>({
    url: {
        type: String,
        required: [true, "Url is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    type: {
        type: String,
        required: [true, "Type is required"],
    },
    userId: {
        type: String,
        required: [true, "UserId is required"],
    }
})

const DocumentModel = (mongoose.models.Document || mongoose.model("Document", DocumentSchema));

export default DocumentModel;