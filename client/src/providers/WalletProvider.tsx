import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createConfig, WagmiProvider, http } from "wagmi";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { coinbaseWallet } from "wagmi/connectors";
import { baseSepolia } from "wagmi/chains";
import { useState } from "react";

export const cbWalletConnector = coinbaseWallet({
    appName: "Wagmi Smart Wallet",
    preference: "smartWalletOnly",
});

export const config = createConfig({
    chains: [baseSepolia],
    // turn off injected provider discovery
    multiInjectedProviderDiscovery: false,
    connectors: [cbWalletConnector],
    ssr: false,
    transports: {
        [baseSepolia.id]: http(),
    },
});

export default function WalletProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <>
            {" "}
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </>
    );
}
declare module "wagmi" {
    interface Register {
        config: typeof config;
    }
}
