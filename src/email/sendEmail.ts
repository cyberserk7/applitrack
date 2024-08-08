import { resend } from "@/lib/resend";
import VerificationEmail from "./VerificationEmail";
import OTPEmail from "./OTPEmail";
import { JobApplication } from "@/models/User";
import ReminderEmail from "./ReminderEmail";
import SupportEmail from "./SupportEmail";

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
            from: 'AppliTrack <onboarding@applitrack.online>',
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
            from: 'AppliTrack <onboarding@applitrack.online>',
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

export async function SendReminderEmail({email, app, name}: {
    email: string, app: JobApplication, name: string
}): Promise<APIResponse> {
    try {
        await resend.emails.send({
            from: 'AppliTrack <onboarding@applitrack.online>',
            to: email,
            subject: 'AppliTrack | Interview Reminder',
            react: ReminderEmail({name: name, companyName: app.companyName, jobTitle: app.jobRole, interviewDate: app.interviewDate})
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

export async function SendSupportEmail({email, text} : {
    email: string, text: string
}): Promise<APIResponse> {
    try {
        await resend.emails.send({
            from: 'AppliTrack <onboarding@applitrack.online>',
            to: "deynilabjo@gmail.com",
            subject: `Support Request | ${email}`,
            react: SupportEmail({message: text, email: email})
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