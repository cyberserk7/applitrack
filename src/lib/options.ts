import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./db-connect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import VerificationTokenModel from "@/models/VerificationToken";
import { SendVerificationEmail } from "@/email/sendEmail";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials: any) {
                await dbConnect();
                try {
                    const {email, password} = credentials;

                    const user = await UserModel.findOne({
                        email,
                    })

                    if(!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if(!passwordMatch) {
                        return null;
                    }

                    return user
                } catch (error) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (token && user) {
                token._id = user._id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({session, token}) {
            if(session && token) {
                session.user._id = token._id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
        async signIn({user}) {
            const existingUser = await UserModel.findOne({ email: user.email });
            if(existingUser?.isVerified) {
                return true;
            }

            // delete any existing verification tokens for this user
            await VerificationTokenModel.findOneAndDelete({ userId: user._id});

            // create a new verification token for this user
            const newVerificationToken = await VerificationTokenModel.create({
                userId: user._id,
                expiryDate: new Date(Date.now()+3600000)
            });

            // send the verification link to the user's email
            await SendVerificationEmail({
                name: user.name!,
                token: newVerificationToken._id,
                email: user.email!,
            })

            return false;
        }
    },
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}