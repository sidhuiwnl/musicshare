import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default async function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-extrabold flex justify-center items-center">
        RealTime Music Using Spotify Selection,Collaboration <ModeToggle />{" "}
      </h1>
      <div className="flex justify-center items-center space-x-5">
        <Link className="flex mt-5 font-medium " href={"/login"}>
          Login with spotify
          <ArrowRight className="ml-2" />
        </Link>
        <div className="flex justify-center items-center ">
          <Link
            className="   rounded-lg mt-4 "
            href={"https://github.com/sidhuiwnl/musicshare"}
          >
            <Github />
          </Link>
        </div>
      </div>
    </div>
  );
}
