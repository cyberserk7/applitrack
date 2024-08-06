import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import DocumentModel from "@/models/Document";
import { getServerSession } from "next-auth";

export async function GET() {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({
                message: "You are not logged in",
                success: false,
            }, {
                status: 401,
            })
        }
        const documents = await DocumentModel.find({
            userId: session.user._id,
        });
        return Response.json({
            documents,
            message: "Documents fetched successfully",
            success: true,
        }, {
            status: 200,
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            documents: [],
            message: "Something went wrong",
            success: false,
        }, {
            status: 500,
        })
    }
}   