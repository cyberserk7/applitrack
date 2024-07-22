import { resend } from "@/lib/resend";
import VerificationEmail from "./VerificationEmail";
import OTPEmail from "./OTPEmail";

interface APIResponse  {
    success: boolean,
    message: string;
}


export async function SendVerificationEmail({email, token, name} : {
    email: string, token: string, name: string
}): Promise<APIResponse> {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'AppliTrack | Verification Email',
            react: VerificationEmail({ name, url })
        });    
        
        return {
            success: true,
            message: "Email sent"
        }
    } catch(error) {
        console.log(error)  
        return {
            success: false,
            message: "Error sending email"
        }
    }
}

export async function SendOTPEmail({email, code, name} : {
    email: string, code: string, name: string
}): Promise<APIResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'AppliTrack | Reset Password Email',
            react: OTPEmail({code: code, name: name})
        })

        return {    
            success: true,
            message: "Email sent"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error sending email"
        }
    }
}