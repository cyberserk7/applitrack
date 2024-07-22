import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    name: string;
    password: string;
    email: string;
    isVerified: boolean;
    jobApplications: JobApplication[];
}

export interface JobApplication extends Document {
    jobPostLink: string;
    jobRole: string;
    companyName: string;
    salary: number;
    notes: string;
    interviewDate: Date;
    jobCountry: string;
    jobLocation: string;
    workType: "Onsite" | "Remote";
    applicationStatus: "Bookmarked" | "Applied" | "Interview Scheduled" |  "Got Offer";
    isArchived: boolean;
}

const JobApplicationSchema = new Schema<JobApplication>({
    jobRole: {
        type: String,
        required: [true, "Job title is required"],
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"],
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"],
    },
    notes: {
        type: String,
        required: false,
    },
    interviewDate: {
        type: Date,
        required: false,
    },
    jobCountry: {
        type: String,
        required: [true, "Job country is required"],
    },
    jobLocation: {
        type: String,
        required: [true, "Job location is required"],
    },
    workType: {
        type: String,
        required: [true, "Work type is required"],
        enum: ["Onsite", "Remote"],
    },
    applicationStatus: {
        type: String,
        required: [true, "Application status is required"],
        enum: ["Applied", "Interview Scheduled", "Got Offer", "Declined"],
    },
    isArchived: {
        type: Boolean,
        default: false
    }
})

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    jobApplications: [JobApplicationSchema],
})

const UserModel = (mongoose.models.User || mongoose.model("User", UserSchema));

export default UserModel;