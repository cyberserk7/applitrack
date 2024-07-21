import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    dbConnect();
    try {
        const { email, password } = await request.json();
        const user = await UserModel.findOne({email});
        if(!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 400
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();

        return Response.json({
            success: true,
            message: "Password changed successfully"
        }, {
            status: 200
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}