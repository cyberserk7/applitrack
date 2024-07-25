import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request) {
    await dbConnect();
    try {
        const url = new URL(req.url);
        const applicationId = url.searchParams.get("applicationId");
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
                message: "You must be logged in to delete an application"
            }, {
                status: 401
            })
        }

        const updatedUser = await UserModel.updateOne({
            email: session.user.email
        }, {
            $pull: {
                jobApplications: {
                    _id: applicationId
                }
            }
        })

        if(updatedUser.modifiedCount === 0) {
            return Response.json({
                success: false,
                message: "Failed to delete application"
            }, {
                status: 400
            })
        }

        return Response.json({
            success: true,
            message: "Application deleted successfully"
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: "Failed to delete application"
        }, {
            status: 500
        })
    }
}