

import { signIn } from "../lib/auth"


export default function Login(){
    
    
    return(
        <div>
            <form action={async() =>{
                "use server"
                await signIn("spotify")
            }}>
                <button type="submit">Signin with Spotify</button>
            </form>
        </div>
    )
}