import dbConnect from "@/lib/db-connect";
import { getServerAuthSession } from "@/lib/options";
import UserModel, { JobApplication } from "@/models/User";
import { editApplicationSchema } from "@/schema/edit-application-schema";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const params = new URL(req.url).searchParams;
        const applicationId = params.get("applicationId");

        const values = await req.json();
        const res = editApplicationSchema.safeParse(values);
        if(!res.success) {
            return Response.json({
                success: false,
                message: "Invalid data provided"
            }, {
                status: 400
            })
        }

        const { jobPostLink, jobRole, companyName, salary, jobLocation, jobCountry, workType, applicationStatus, currency } = res.data;

        const session = await getServerAuthSession();

        if(!session) {
            return Response.json({
                success: false,
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const user = await UserModel.findOne({email: session.user.email})

        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).jobPostLink = jobPostLink;
        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).jobRole = jobRole;
        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).companyName = companyName;
        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).salary = salary;
        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).jobLocation = jobLocation;
        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).jobCountry = jobCountry;
        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).workType = workType;
        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).applicationStatus = applicationStatus;
        user.jobApplications.find((application: JobApplication) => application._id!.toString() === applicationId).currency = currency;

        await user.save();

        return Response.json({
            success: true,
            message: "Application updated successfully"
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