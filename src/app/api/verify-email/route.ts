import dbConnect from "@/lib/db-connect"
import UserModel from "@/models/User";
import VerificationTokenModel from "@/models/VerificationToken";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const  { token }  = await req.json();
        const existingToken = await VerificationTokenModel.findOne({
            _id: token
        })

        if(!existingToken) {
            return Response.json({
                success: false,
                message: "Invalid token"
            }, {
                status: 400
            })
        }

        const hasExpired = existingToken.expiryDate > new Date();

        if(hasExpired) {
            return Response.json({
                success: false,
                message: "Verification link has expired"
            }, {
                status: 400
            })
        }

        const user = await UserModel.findOne({
            _id: existingToken.userId
        })

        if(!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 400
            })
        }

        if(user.isVerified) {
            return Response.json({
                success: false,
                message: "User already verified"
            }, {
                status: 400
            })
        }

        user.isVerified = true;
        await user.save();

        return Response.json({
            success: true,
            message: "User verified successfully"
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}