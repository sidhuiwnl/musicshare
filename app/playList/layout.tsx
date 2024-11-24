import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import localFont from "next/font/local";



const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function PlayListCollection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black font-[family-name:var(--font-geist-sans)] w-screen h-screen`}
      >
        {children}
      </div>
    </SidebarProvider>
  );
}
