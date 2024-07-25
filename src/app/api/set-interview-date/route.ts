import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import UserModel, { JobApplication } from "@/models/User";
import { SetInterviewDateSchema } from "@/schema/set-interview-date";
import { getServerSession } from "next-auth";

export async function PATCH(request: Request) {
    await dbConnect();
    try {
        const url = new URL(request.url);
        const applicationId = url.searchParams.get("applicationId");
        const {date} = await request.json();

        
        if (!applicationId) {
            return Response.json({
                success: false,
                message: "No application id provided"
            }, {
                status: 400
            })
        }

        const session = await getServerSession(authOptions);

        if (!session) { 
            return Response.json({
                success: false,
                message: "You must be logged in to set an interview date"
            }, {
                status: 401
            })
        }

        const existingUser = await UserModel.findOne({email: session.user.email});

        if (!existingUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }

        existingUser.jobApplications.find((app: JobApplication) => app._id!.toString() === applicationId).interviewDate = new Date(date);

        await existingUser.save();

        return Response.json({
            success: true,
            message: "Interview Date updated"
        }, {
            status: 200
        })  
    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: "Failed to set interview date"
        }, {
            status: 500
        })
    }
    
}