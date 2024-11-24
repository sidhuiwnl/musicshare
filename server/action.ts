"use server";

export async function getToken() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "f86edfbb300e4419b2062fecfe76d8da",

        client_secret: "fb5c2ba0a2af46178a1d0ceb87060a3d",
      }).toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the token");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Internal Server Error");
  }
}


export async function getUser(){
    const { access_token } = await getToken();

    try {
        const response = await fetch("https://api.spotify.com/v1/me",{
            headers : {
                Authorization: 'Bearer ' + access_token
            }
        })

        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error("Internal Server Error");
    }
   
}

getUser()