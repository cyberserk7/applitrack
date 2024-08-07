import dbConnect from "@/lib/db-connect";
import FeedbackModel from "@/models/Feedback";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const { content, userId } = await req.json();
        const feedback = await FeedbackModel.create({
            content,
            userId,
        })
        return Response.json({ success: true, message: "Feedback sent successfully" }, {status: 200});
    } catch (error) {
        return Response.json({ success: false, error: "Something went wrong" }, {status: 500});
    }
}