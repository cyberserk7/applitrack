import { resend } from "@/lib/resend";
import VerificationEmail from "./VerificationEmail";

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
            subject: 'AppliTracker | Verification Email',
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