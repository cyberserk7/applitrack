import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import DocumentModel from "@/models/Document";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const { url, title, type } = await req.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({
                message: "You are not logged in",
                success: false,
            }, {
                status: 401,
            })
        }

        const newDocument = await DocumentModel.create({
            url,
            title,
            type,
            userId: session.user._id,
        })
        if(newDocument) {
            return Response.json({
                message: "Document uploaded successfully",
                success: true,
            }, {
                status: 200,
            })
        }
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Something went wrong",
            success: false,
        }, {
            status: 500,
        })
    }
}