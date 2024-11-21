import { Sidebar,SidebarHeader,SidebarContent,SidebarFooter,SidebarMenu,SidebarMenuItem,SidebarMenuButton, SidebarGroupLabel } from "./ui/sidebar"
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,DropdownMenuItem } from "./ui/dropdown-menu"
import { ChevronUp } from "lucide-react"
import { auth } from "@/app/lib/auth"
import Image from "next/image"

export async function AppSidebar() {
    const session  = await auth();
    return (
      
        <Sidebar>
          <SidebarGroupLabel className="mt-2 ml-2">MusicShare</SidebarGroupLabel>
          <SidebarHeader />
          <SidebarContent />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                        <Image 
                        src={session?.user?.image || "./default-image.png"}
                        width={50}
                        height={50}
                        alt="user"
                        />
                       {session?.user?.name}
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <DropdownMenuItem>
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      
    )
  }
  