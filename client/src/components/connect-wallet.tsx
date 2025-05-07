import { cbWalletConnector } from "@/providers/WalletProvider";

import { useAccount, useConnect, useDisconnect } from "wagmi";

const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default function ConnectWallet() {
    const { isConnected, address } = useAccount();
    const { connect } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <div>
            {isConnected ? (
                <div className="flex items-center gap-2">
                    <span>{truncateAddress(address || "")}</span>
                    <button onClick={() => disconnect()}>Disconnect</button>
                </div>
            ) : (
                <button
                    onClick={() => connect({ connector: cbWalletConnector })}
                >
                    Connect Smart Wallet
                </button>
            )}
        </div>
    );
}
