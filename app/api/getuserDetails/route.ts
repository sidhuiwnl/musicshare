import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AUTH_SPOTIFY_ID || "",

        client_secret: process.env.AUTH_SPOTIFY_SECRET || "",
      }).toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the token");
    }

    const data = await response.json();
       
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        msg: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}


