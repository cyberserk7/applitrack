import dbConnect from "@/lib/db-connect";
import ApplicationCountModel from "@/models/ApplicationCount";

export async function GET(req: Request) {
    await dbConnect();
    try {
        const res = await ApplicationCountModel.find();
        return Response.json({  count: res[0].count }, {
            status: 200,
        })

    } catch (error) {
        console.log(error);
        return Response.json({
            count: 0,
        }, {
            status: 500,
        })
    }
}