import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import UserModel, { JobApplication } from "@/models/User";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
    dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({
                success: false,
                message: "Unauthorized",
                applications: [],
            }, {
                status: 401,
            })
        }

        const user = session.user;
        const existingUser = await UserModel.findOne({
            email: user.email,
        })

        if(!existingUser) {
            return Response.json({
                success: false,
                message: "User not found",
                applications: [],
            }, {
                status: 404,
            })
        }


        return Response.json({
            success: true,
            applications: existingUser.jobApplications,
            message: "Success"
        }, {
            status: 200,
        })

    } catch (error) {
        console.log("GET_APPLICATIONS_ERROR", error);
        return Response.json({
            success: false,
            message: "Something went wrong",
            applications: [],
        } , {
            status: 500,
        })
    }
}