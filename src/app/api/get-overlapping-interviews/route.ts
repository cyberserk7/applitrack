import dbConnect from "@/lib/db-connect";
import { authOptions } from "@/lib/options";
import UserModel, { JobApplication } from "@/models/User";
import { getServerSession } from "next-auth";

interface overlappingInterview {
    date: string;
    applications: JobApplication[];
}

export async function GET() {
    await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if(!session) {
        return Response.json({
            message: "Not logged in",
            success: false,
        }, {
            status: 401,
        })
    }

    const email = session.user.email;

    const existingUser = await UserModel.findOne({
        email: email,
    })

    if(!existingUser) {
        return Response.json({
            message: "User not found",
            success: false,
        }, {
            status: 404,
        })  
    }

    const applicationsWithInterviews = existingUser.jobApplications.filter((app: JobApplication) => app.interviewDate !== null && app.isArchived === false);

    // Group applications by interview date
    const groupedByDate: {[key: string]: JobApplication[]} = {};

    applicationsWithInterviews.forEach((app: JobApplication) => {
        const dateKey = new Date(app.interviewDate!).toDateString();
        if(!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = [];
        }
        groupedByDate[dateKey].push(app);
    })

    const overlaps: overlappingInterview[] = Object.entries(groupedByDate)
    .filter(([_, apps]) => apps.length > 1)
    .map(([date, apps]) => ({
        date,
        applications: apps,
    }))

    if(overlaps.length > 0) {
        return Response.json({
            message: "Overlapping interviews found",
            success: true,
            overlaps: overlaps,
        }, {
            status: 200,
        })
    } else {
        return Response.json({
            message: "No overlapping interviews found",
            success: true,
            overlaps: []
        }, {
            status: 200,
        })
    }

  } catch (error) {
    console.log(error);
    return Response.json({
        message: "Error checking for overlapping interviews",
        success: false,
    }, {
        status: 500,
    })
  }
}