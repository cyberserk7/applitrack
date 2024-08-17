import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import ApplicationCountModel from "@/models/ApplicationCount";
import UserModel from "@/models/User";
import { addApplicationSchema } from "@/schema/add-application-schema";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
    dbConnect();
    try {
        const session = await getServerSession(authOptions);

        if(!session) {
            return Response.json({
                success: false,
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const user = session.user;

        const values = await req.json();
        const res = addApplicationSchema.safeParse(values);
        console.log(res)
        if(!res.success) {
            return Response.json({
                success: false,
                message: "Invalid data provided"
            }, {
                status: 400
            })
        }

        const { jobPostLink, jobRole, companyName, salary, jobLocation, jobCountry, workType, applicationStatus, currency } = res.data;

        const existingUser = await UserModel.findOne({email: user.email});

        if(!existingUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 400
            })
        }

        existingUser.jobApplications.push({
            jobPostLink,
            jobRole,
            companyName,
            salary,
            jobLocation,
            jobCountry,
            workType,
            applicationStatus,
            currency
        })

        await existingUser.save();
        revalidatePath("/dashboard");

        const applicationCount = await ApplicationCountModel.find();
        applicationCount[0].count = applicationCount[0].count + 1;
        await applicationCount[0].save();

        return Response.json({
            success: true,
            message: "Application added successfully"
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