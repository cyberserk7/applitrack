import dbConnect from "@/lib/db-connect";
import ForgotPasswordCodeModel from "@/models/ForgotPasswordCode";
import UserModel from "@/models/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, code } = await request.json();
        const user = await UserModel.findOne({email});
        if(!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 400
            })
        }
        
        const otpCode = await ForgotPasswordCodeModel.findOne({
            userId: user._id,
        })

        if(otpCode.code !== code) {
            return Response.json({
                success: false,
                message: "Invalid code"     
            }, {
                status: 400
            })
        }

        if(otpCode.expiryDate < new Date()) {
            return Response.json({
                success: false,
                message: "Code expired"     
            }, {
                status: 400
            })
        }

        await ForgotPasswordCodeModel.findOneAndDelete({
            userId: user._id
        })

        return Response.json({
            success: true,
            message: "Correct code provided"
        }, {
            status: 200
        })

    } catch(error) {
        return Response.json({
            success: false,
            message: "Something went wrong"
        }, {
            status: 400
        })
    }
}