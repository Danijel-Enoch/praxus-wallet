import { cbWalletConnector } from "@/providers/WalletProvider";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Copy, User } from "lucide-react";

const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function ConnectWallet({ isOpen }: { isOpen?: boolean }) {
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
                <div className="w-full h-20 relative bg-gradient-to-br from-slate-200/20 to-emerald-100/0 rounded-2xl border-t border-white/10 inline-flex items-center justify-between gap-2 px-4">
                      <User
                        className="cursor-pointer text-white"
                        size={30}
                        onClick={() => disconnect()}
                        // disabled={registerMutation.isPending}
                    />
                        <div className="w-2.5 h-2.5 left-0 top-0 absolute bg-green-400 rounded-full shadow-[0px_0px_12px_0px_rgba(74,201,126,0.48)]" />
                    <div className="flex items-center justify-center">
                        
                        {!isOpen &&<div className="flex items-center  text-center justify-center text-white text-base font-semibold font-['Raleway'] leading-normal tracking-tight">
                            {truncateAddress(address || "")}
                        </div>}
                    </div>
                        {!isOpen && <Copy className="cursor-pointer" onClick={() => navigator.clipboard.writeText(address || "")}/>}

                  
                </div>
            ) : (
                <button
                    onClick={handleConnect}
                    disabled={registerMutation.isPending}
                    className="w-full h-20 relative bg-gradient-to-br from-slate-200/20 to-emerald-100/0 rounded-2xl border-t border-white/10 flex items-center justify-center text-white font-semibold"
                >
                    {registerMutation.isPending
                        ? "Connecting..."
                        : "Connect Smart Wallet"}
                </button>
            )}
        </div>
    );
}
