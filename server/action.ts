"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function getPlayList() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    let spotifyId = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    const token = spotifyId?.access_token;

    const response = await fetch(
      `https://api.spotify.com/v1/users/${spotifyId?.providerAccountId}/playlists`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Unable to fetch playlist`);
    }

    const data = await response.json();

    return {
      data,
      token,
    };
  } catch (error) {
    console.error("Internal server error");
  }
}

export async function getPlayListTracks( playListId : string){
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    let spotifyId = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    const token = spotifyId?.access_token;

   const response =  await fetch(`https://api.spotify.com/v1/playlists/${playListId}/tracks`,{
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      },
      method : "GET"
    })

    if(!response.ok){
      throw new Error("Unable to fetch playlist tracks ")
    }
    const data = await response.json();


    
    return {
      data : data
    }
  } catch (error) {
    console.error("Internal server error");
  }
}

