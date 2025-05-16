import { ethers } from "ethers";
import { elizaLogger } from "@elizaos/core";

export const createGetWalletBalanceService = () => {
    const getBalance = async (address: string) => {
        if (!address) {
            throw new Error("Wallet address is required");
        }

        if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
            throw new Error("Invalid Ethereum address format");
        }

        try {
            const provider = new ethers.JsonRpcProvider(
                process.env.ETH_RPC_URL || "https://eth.llamarpc.com"
            );

            if (!provider) {
                throw new Error("Failed to initialize Ethereum provider");
            }

            const balance = await provider.getBalance(address);
            const balanceInEth = ethers.formatEther(balance);

            // Get USD conversion rate
            try {
                const usdRate = await getEthUsdPrice();
                const balanceInUsd = (
                    parseFloat(balanceInEth) * usdRate
                ).toFixed(2);

                elizaLogger.success(
                    `Successfully retrieved balance for ${address}`
                );
                return {
                    balance: balanceInEth,
                    balanceInUsd,
                };
            } catch (priceError) {
                // If price fetch fails, return just ETH balance
                elizaLogger.warn("Failed to get ETH/USD price:", priceError);
                return {
                    balance: balanceInEth,
                    balanceInUsd: "N/A",
                };
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred";
            elizaLogger.error("Error getting wallet balance:", {
                address,
                error: errorMessage,
            });

            if (errorMessage.includes("network")) {
                throw new Error(
                    "Network error: Unable to connect to Ethereum node"
                );
            }

            // Rethrow with more context
            throw new Error(`Failed to get wallet balance: ${errorMessage}`);
        }
    };

    return { getBalance };
};

async function getEthUsdPrice() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        const data = await response.json();
        return data.ethereum.usd;
    } catch (error) {
        throw new Error("Failed to fetch ETH/USD price");
    }
}
