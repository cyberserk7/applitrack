import { SendVerificationEmail } from "@/email/sendEmail";
import dbConnect from "@/lib/db-connect";
import UserModel from "@/models/User";
import VerificationTokenModel from "@/models/VerificationToken";
import { signUpSchema } from "@/schema/sign-up-schema";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const values = await req.json();
    const res = signUpSchema.safeParse(values);
    if(!res.success) {
        return Response.json({
            success: false,
            message: "Invalid data provided"
        }, {
            status: 400
        })
    }
    const { name, email, password } = res.data;
    await dbConnect();
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
        const user = await UserModel.findOne({email: email});
        if(user) {
            if(user.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists"
                }, {
                    status: 400
                })
            } else {
                 // delete previous token
                await VerificationTokenModel.deleteOne({
                    userId: user._id,
                })

                // update password
                user.password = hashedPassword;
                user.name = name;
                await user.save();

                // create new token
                const verificationToken = await VerificationTokenModel.create({
                    userId: user._id,
                    createAt: new Date(Date.now())
                })

                // send verification email
                await SendVerificationEmail({
                    email: user.email,
                    token: verificationToken._id,
                    name: user.name,
               })       
            }
        } else {
            const newUser = await UserModel.create({
                name,
                email,
                password: hashedPassword,
                isVerified: false,
                jobApplications: []
            })
    
            // create new token
            const verificationToken = await VerificationTokenModel.create({
                userId: newUser._id,
                createdAt: new Date(Date.now())
            })
    
            // send verification email  
            await SendVerificationEmail({
                email: newUser.email,
                token: verificationToken._id,
                name: newUser.name,
            })
        }

        return Response.json({
            success: true,
            message: "Email sent"
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "Error creating user"  
        }, {
            status: 500
        })
    }
}