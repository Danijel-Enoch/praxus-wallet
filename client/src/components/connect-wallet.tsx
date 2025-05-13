import { cbWalletConnector } from "@/providers/WalletProvider";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function ConnectWallet() {
    const { isConnected, address } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();

    const registerMutation = useMutation({
        mutationFn: async (address: string) => {
            return await apiClient.registerUser(address);
        },
    });

    const handleConnect = async () => {
        try {
            await connect({ connector: cbWalletConnector });
            if (address) {
                await registerMutation.mutateAsync(address);
            }
        } catch (error) {
            console.error("Failed to connect or register wallet:", error);
        }
    };

    useEffect(() => {
        if (isConnected && address) {
            registerMutation.mutate(address);
        }
    }, [isConnected, address]);

    return (
        <div>
            {isConnected ? (
                <div className="flex items-center gap-2">
                    <span>{truncateAddress(address || "")}</span>
                    <button
                        onClick={() => disconnect()}
                        disabled={registerMutation.isPending}
                    >
                        Disconnect
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleConnect}
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending
                        ? "Connecting..."
                        : "Connect Smart Wallet"}
                </button>
            )}
        </div>
    );
}
