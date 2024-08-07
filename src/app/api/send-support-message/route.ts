import { SendSupportEmail } from "@/email/sendEmail";
import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { text } = await request.json();
        const session = await getServerSession(authOptions);
        if(!session) {
            return Response.json({
                message: "Unauthorized",
                success: false,
            }, {
                status: 401,
            })
        }

        await SendSupportEmail({email: session.user.email!, text: text});
        return Response.json({
            message: "Support message sent",
            success: true,
        }, {
            status: 200,
        })
        
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Error sending support message",
            success: false,
        }, {
            status: 500,
        })
    }
}