import Link from "next/link";
import { ArrowRight,Github } from "lucide-react";

export default async function Home() {
 
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl">RealTime Music Using Spotify Selection,Collaboration  </h1>
      <div className="flex justify-center items-center space-x-5">
        <Link
        className="flex mt-5"
        href={"/login"}
        >Login with spotify
        <ArrowRight/>
        </Link>
        <Link
        className="p-2 border-2 bg-neutral-800 rounded-lg mt-3"
        href={"https://github.com/sidhuiwnl/musicshare"}
        >
          <Github/>
        </Link>
      </div>
    </div>
  );
}
