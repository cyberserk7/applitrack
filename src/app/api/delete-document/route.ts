import dbConnect from "@/lib/db-connect";
import DocumentModel from "@/models/Document";

export async function DELETE(req: Request) {
    await dbConnect();
    try {
        const searchParams = new URL(req.url);
        const documentId = searchParams.searchParams.get("documentId");

        if(!documentId) {
            return Response.json({
                message: "Missing documentId",
                success: false
            }, {
                status: 400
            })
        }

        await DocumentModel.findOneAndDelete({
            _id: documentId
        })

        return Response.json({
            message: "Document deleted",
            success: true
        }, {
            status: 200
        })

    } catch (error) {
        return Response.json({
            message: "Failed to delete document",
            success: false
        }, {
            status: 500
        })
    }
}