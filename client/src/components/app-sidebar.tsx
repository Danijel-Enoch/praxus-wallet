import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import ConnectWallet from "./connect-wallet";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export const AppSidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof Sidebar>>(
    ({ className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000
    });

    const agents = query?.data?.agents;
    console.log(agents)
    return (
        <Sidebar collapsible="icon" className={cn("w-[280px] min-w-[80px]", className)} ref={ref} {...props}>
            <SidebarHeader className="flex flex-row border-b justify-between">
                    <a href="/" className="flex items-center gap-4">
                        <img
                            alt="praxus logo"
                            src={isOpen ? "/logo.png" : "/praxus.png"}
                            className={cn(
                                "transition-all duration-200",
                                isOpen ? "w-28" : "w-44"
                            )}
                        />
                    </a>
                    <SidebarTrigger
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "hover:bg-accent hover:text-accent-foreground p-1 rounded-md",
                        isOpen && "rotate-180 hidden"
                    )}
                />
            </SidebarHeader>
            <SidebarContent className="flex-1 justify-start items-center py-10 space-y-5">
                <SidebarTrigger
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "hover:bg-accent hover:text-accent-foreground p-1 rounded-md",
                        isOpen ? "rotate-180 ":"hidden"
                    )}
                />
                <NavLink 
                    to={`/chat/${agents[0].id}`} 
                    className={({ isActive }) => cn(
                        "w-full h-fit  bg-gradient-to-br from-slate-200/20 to-emerald-100/0 rounded-sm  inline-flex justify-center items-center  gap-2 px-4 py-2",
                        isActive && "bg-slate-200/30"
                    )}
                >
                    <MessageCircle className="text-green-500"/>
                    {!isOpen && <p className="">
                        Chat
                    </p>}
                </NavLink>
            </SidebarContent>
            <SidebarFooter>
                <ConnectWallet isOpen={isOpen} />
            </SidebarFooter>
        </Sidebar>
    );
});

AppSidebar.displayName = "AppSidebar";
