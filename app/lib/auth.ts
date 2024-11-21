import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const  { handlers, signIn, signOut, auth } = NextAuth({
    adapter : PrismaAdapter(prisma),
    providers : [Spotify],
    callbacks  : {
        async redirect({ url ,baseUrl }){
            return "/playList"
        }
    }
    
})