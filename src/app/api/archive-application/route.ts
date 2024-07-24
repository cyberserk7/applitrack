import dbConnect from "@/lib/db-connect"
import { authOptions } from "@/lib/options";
import UserModel, { JobApplication } from "@/models/User";
import { getServerSession } from "next-auth";

export async function PATCH(request: Request) {
    await dbConnect();
    try {
        const url = new URL(request.url);
        const applicationId = url.searchParams.get("applicationId");

        const session = await getServerSession(authOptions);

        
        if(!session) {
            return Response.json({
                success: false,
                message: "You must be logged in to archive an application"
            }, {
                status: 401
            })
        }
        
        const user = session.user;

        const existingUser = await UserModel.findOne({
            email: user.email
        })

        if(!existingUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 401
            })
        }       

        existingUser.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).isArchived = true;
        await existingUser.save();

        return Response.json({
            success: true,
            message: "Application archived successfully"
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}