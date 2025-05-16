import { formatEther, JsonRpcProvider } from "ethers";
import { alchemyApiKey } from "../const";

type BalanceResponse = {
    address: string;
    balance: number;
    balanceInUsd: number;
};

export const createWalletBalanceService = () => {
    const provider = new JsonRpcProvider(
        "https://base-mainnet.g.alchemy.com/v2/XodKhBFQ9ZlyCjF4UEysO3Z_9qttO6qo"
    );

    const getBalance = async (address: string): Promise<BalanceResponse> => {
        if (!address) {
            throw new Error("Invalid parameters");
        }

        try {
            // Get the latest ETH balance
            const balanceResult = await provider.getBalance(address);

            console.log("Balance Result:", balanceResult);
            const balanceInEth = formatEther(balanceResult); // Convert from Wei to ETH

            // TODO: Add price fetching logic for USD conversion
            // For now using a placeholder conversion
            const balanceInUsd = 1 * 3000; // Placeholder price

            const response: BalanceResponse = {
                address,
                balance: parseFloat(balanceInEth.toString()),
                balanceInUsd,
            };

            return response;
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred";
            console.error("Provider Error:", errorMessage);
            throw new Error(`Failed to get balance: ${errorMessage}`);
        }
    };

    return { getBalance };
};
