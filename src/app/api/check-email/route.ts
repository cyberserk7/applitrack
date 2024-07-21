import { SendOTPEmail } from "@/email/sendEmail";
import dbConnect from "@/lib/db-connect";
import ForgotPasswordCodeModel from "@/models/ForgotPasswordCode";
import UserModel from "@/models/User";
import { emailSchema } from "@/schema/email-schema";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const values = await req.json();
        const res = emailSchema.safeParse(values)

        if(!res.success) {
            return Response.json({
                success: false,
                message: "Invalid data provided"    
            }, {
                status: 400
            })
        }

        const { email } = res.data;

        const user = await UserModel.findOne({
            email
        })

        if(!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 400
            })
        }

        if(!user.isVerified) {
            return Response.json({
                success: false,
                message: "User not verified"
            }, {
                status: 400
            })
        }

        // delete any existing otp codes for this user
        await ForgotPasswordCodeModel.findOneAndDelete({ userId: user._id});

        // generate 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000)

        await ForgotPasswordCodeModel.create({
            code: code.toString(),
            userId: user._id,
            expiryDate: new Date(Date.now()+360000)
        })

        await SendOTPEmail({
            email: user.email,
            code: code.toString(),
            name: user.name,
        })

        return Response.json({    
            success: true,
            message: "Email sent"
        }, {
            status: 200
        })

    } catch (error) {
        return Response.json({
            success: false,
            message: "Something went wrong"
        } , {
            status: 500
        })
    }
}