import { SendReminderEmail } from "@/email/sendEmail";
import dbConnect from "@/lib/db-connect";
import UserModel, { JobApplication } from "@/models/User";

function isWithinNextDay(interviewDate: Date): boolean {
    const now = new Date();
    const timeDifference = interviewDate.getTime() - now.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);
    return hoursDifference <= 24 && hoursDifference > 0;
  }

export async function GET(req: Request) {
    await dbConnect();
    try {
        const users = await UserModel.find();
        for(const user of users) {
            const applicationsToNotify = user.jobApplications.filter((app: JobApplication) => {
                return !app.isArchived && app.interviewDate && app.sendEmail && !app.emailSent && isWithinNextDay(app.interviewDate);
            })

            for(const app of applicationsToNotify) {
                await SendReminderEmail({email: user.email, app, name: user.name});
                app.emailSent = true;
            }

            if(applicationsToNotify.length > 0) {
                await user.save();
            }
        }

        return Response.json({
            message: "Emails sent successfully",
            success: true,  
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Error occured while sending emails",
            success: false,
        }, {
            status: 500
        })
    }
}