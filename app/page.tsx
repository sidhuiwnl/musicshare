import Link from "next/link";
import { ArrowRight,Github } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default async function Home() {
 
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold flex justify-center items-center">RealTime Music Using Spotify Selection,Collaboration <ModeToggle/> </h1>
      <div className="flex justify-center items-center space-x-5">
        <Link
        className="flex mt-5 font-medium "
        href={"/login"}
        >Login with spotify
        <ArrowRight className="ml-2"/>
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
