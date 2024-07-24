import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import UserModel, { JobApplication } from "@/models/User";
import { getServerSession } from "next-auth";

export async function PATCH(req: Request) {
    await dbConnect();
    try {
        const url = new URL(req.url);
        const status = url.searchParams.get("status");
        if (!status) {
            return Response.json({
                message: "No status provided",
                success: false,
            }, {
                status: 400
            })
        }
        const session = await getServerSession(authOptions)

        if(!session) {
            return Response.json({
                message: "Not authenticated",
                success: false,
            }, {
                status: 401
            })
        }

        const existingUser = await UserModel.findOne({
            email: session.user.email
        })

        if(!existingUser) {
            return Response.json({
                message: "User not found",
                success: false,
            }, {
                status: 404
            })
        }

        existingUser.jobApplications.map((app: JobApplication) => {
            if(app.applicationStatus == status) {
                app.isArchived = true;
            }
        })

        await existingUser.save();

        return Response.json({
            message: "Applications cleared",
            success: true,
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Error clearing applications",
            success: false,
        }, {
            status: 500
        })
    }
}