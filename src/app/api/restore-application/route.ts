import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import UserModel, { JobApplication } from "@/models/User";
import { getServerSession } from "next-auth";

export async function PATCH(request: Request) {
    await dbConnect();
    try {
        const url = new URL(request.url);
        const applicationId = url.searchParams.get("applicationId");
        console.log(applicationId);

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
                message: "You must be logged in to restore an application"
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

        existingUser.jobApplications.find((app: JobApplication) => app._id!.toString() === applicationId).isArchived = false;

        await existingUser.save();

        return Response.json({
            success: true,
            message: "Application restored"
        }, {
            status: 200
        })  
    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: "Failed to restore application"
        }, {
            status: 500
        })
    }
}