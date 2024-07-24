import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import UserModel, { JobApplication } from "@/models/User";
import { getServerSession } from "next-auth";

export async function PATCH(request: Request) {
    await dbConnect();
    try {
        const params = new URL(request.url);
        const applicationId = params.searchParams.get("applicationId");
        const status = params.searchParams.get("status");

        const session = await getServerSession(authOptions);

        if(!session) {
            return Response.json({
                message: "You are not logged in",
                success: false,
            }, { status: 401 });        
        }

        const existingUser = await UserModel.findOne({email: session.user.email})

        if(!existingUser) {
            return Response.json({
                message: "You are not logged in",
                success: false,
            }, { status: 401 });
        }

        existingUser.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).applicationStatus = status;

        console.log(existingUser.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId))

        await existingUser.save();  

        return Response.json({  
            message: "Application moved successfully",
            success: true,
        }, { status: 200 });

    } catch (error) {
        console.log("MOVE_APPLICATION_ERROR: ", error);
        return Response.json({
            message: "Something weng wrong",
            success: false,
        }, { status: 500 });
    }
}