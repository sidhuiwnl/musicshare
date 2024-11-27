import NextAuth, { Session, User } from "next-auth";
import Spotify from "next-auth/providers/spotify";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Spotify],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/playList";
    },

    async session({ session, user }: { session: Session; user: User }) {
      const spotify = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (
        spotify &&
        spotify.expires_at &&
        spotify.expires_at < Math.floor(Date.now() / 1000)
      ) {
        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_id: process.env.AUTH_SPOTIFY_ID as string,
                client_secret: process.env.AUTH_SPOTIFY_SECRET as string,
                grant_type: "refresh_token",
                refresh_token: spotify.refresh_token || "",
              }),
              method: "POST",
            }
          );

          const token = await response.json();

          if (!response.ok) return token;

          await prisma.account.update({
            data: {
              access_token: token.access_token,
              expires_at: Math.floor((Date.now() + 3600000) / 1000),
              refresh_token: token.refresh_token ?? spotify.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: "spotify",
                providerAccountId: spotify.providerAccountId,
              },
            },
          });
        } catch (error) {
          console.error("Error refreshing access token", error);
        }
      }

      return session;
    },
  },
});
