import { auth } from "./lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <img 
      src={session?.user?.image}
      alt="name"
      />
    </div>
  );
}
