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
    currency: "INR" | "USD" | "EUR" | null;
    salary: number;
    notes: string;
    interviewDate: Date;
    jobCountry: string;
    jobLocation: string;
    workType: "Onsite" | "Remote";
    applicationStatus: "Bookmarked" | "Applied" | "Interview Scheduled" |  "Got Offer";
    isArchived: boolean;
    sendEmail: boolean;
    emailSent: boolean;
}

const JobApplicationSchema = new Schema<JobApplication>({
    jobPostLink: {
        type: String,
        required: [true, "Job post link is required"],
    },
    jobRole: {
        type: String,
        required: [true, "Job title is required"],
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"],
    },
    currency: {
        type: String,
        default: null,
        enum: ["INR", "USD", "EUR", null],
    },
    salary: {
        type: Number,
        default: null,
    },
    notes: {
        type: String,
        required: false,
        default: null,
    },
    interviewDate: {
        type: Date,
        required: false,
        default: null,
    },
    jobCountry: {
        type: String,
        required: false,
        default: null
    },
    jobLocation: {
        type: String,
        required: false,
        default: null
    },
    workType: {
        type: String,
        required: [true, "Work type is required"],
        enum: ["Onsite", "Remote"],
    },
    applicationStatus: {
        type: String,
        required: [true, "Application status is required"],
        enum: ["Bookmarked", "Applied", "Interview Scheduled", "Got Offer"],
    },
    isArchived: {
        type: Boolean,
        default: false
    }, 
    sendEmail: {
        type: Boolean,
        default: false
    },
    emailSent: {
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