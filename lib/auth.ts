import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
export const authOptions:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session:{
        strategy:"jwt",
    },
    callbacks:{
        async signIn({user}){
            await prisma.user.upsert({
                where:{email:user.email!},
                update:{name:user.name!},
                create:{email:user.email!,name:user.name!}
            });
            return true
        },
        async jwt({token}){
            const dbUser = await prisma.user.findUnique({
                where:{email:token.email!},
            });
            token.id = dbUser?.id;
            token.role = dbUser?.role;
            return token
        },
        async session({session,token}){
            if(session.user){
                session.user.id = token.id as string ;
                session.user.role = token.role as string
            }
            return session;
        }
    }
}