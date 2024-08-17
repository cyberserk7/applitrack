import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./db-connect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import VerificationTokenModel from "@/models/VerificationToken";
import { SendVerificationEmail } from "@/email/sendEmail";
import GoogleProvider from "next-auth/providers/google";
import AccountModel from "@/models/Account";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
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

                    if(user.provider !== "credentials") {
                        throw new Error('Use Google to sign in');
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);


                    if(!passwordMatch) {
                        return null;
                    }

                    return user
                } catch (error: any) {
                    if (error.message === 'Use Google to sign in') {
                        throw new Error('OAuth Account');
                    }
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            dbConnect();

            if(account?.provider === "google") {
                let existingUser = await UserModel.findOne({ email: user.email });

                if (!existingUser) {
                    existingUser = await UserModel.create({
                        email: user.email,
                        name: user.name,
                        isVerified: true,
                        provider: 'google'
                    });
                }

                await AccountModel.findOneAndUpdate(
                    { provider: account.provider, providerAccountId: account.providerAccountId },
                    {
                        userId: existingUser._id,
                        type: account.type,
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                        refresh_token: account.refresh_token,
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        token_type: account.token_type,
                        scope: account.scope,
                        id_token: account.id_token,
                        session_state: account.session_state
                    }, { upsert: true, new: true }
                );

                user._id = existingUser._id;
                return true;
            }

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
        },
        async jwt({ token, user }) {
            if (token && user) {
                token._id = user._id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if(session && token) {
                session.user._id = token._id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
        
    },
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export const getServerAuthSession = () => getServerSession(authOptions);