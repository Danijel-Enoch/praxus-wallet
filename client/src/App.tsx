import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import Chat from "./routes/chat";
import Overview from "./routes/overview";
import Home from "./routes/home";
import useVersion from "./hooks/use-version";
import WalletProvider from "./providers/WalletProvider";
import Referral from "./routes/referral";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Number.POSITIVE_INFINITY,
        },
    },
});

function App() {
    useVersion();
    return (
        <WalletProvider>
            <QueryClientProvider client={queryClient}>
                <div
                    className="dark antialiased"
                    style={{
                        colorScheme: "dark",
                        
                    }}
                >
                    <BrowserRouter >
                        <TooltipProvider delayDuration={0}>
                            <SidebarProvider className="">
                                <AppSidebar />
                                <SidebarInset className="relative">
                                    <img src="/bglogo.png" className="absolute top-20 h-[70dvh] w-full z-0 object-contain"/>
                                    <div className="flex flex-1 flex-col gap-4 size-full container bg-transparent">
                                        <Routes >
                                            <Route
                                                path="/"
                                                element={<Home />}
                                                
                                            />
                                            <Route
                                                path="chat/:agentId"
                                                element={<Chat />}
                                            />

                                            <Route
                                                path="settings/:agentId"
                                                element={<Overview />}
                                            />
                                            <Route
                                                path="referral/:address"
                                                element={<Referral />}
                                            />
                                        </Routes>
                                    </div>
                                </SidebarInset>
                            </SidebarProvider>
                            <Toaster />
                        </TooltipProvider>
                    </BrowserRouter>
                </div>
            </QueryClientProvider>
        </WalletProvider>
    );
}

export default App;
