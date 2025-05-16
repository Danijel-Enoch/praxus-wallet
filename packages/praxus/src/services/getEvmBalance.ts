import { Alchemy, Network } from "alchemy-sdk";
import { alchemyApiKey } from "../const";

type BalanceResponse = {
    address: string;
    balance: number;
    balanceInUsd: number;
};

export const createWalletBalanceService = () => {
    const alchemy = new Alchemy({
        apiKey: alchemyApiKey,
        network: Network.ETH_MAINNET,
    });

    const getBalance = async (address: string): Promise<BalanceResponse> => {
        if (!address) {
            throw new Error("Invalid parameters");
        }

        try {
            // Get the latest ETH balance
            const balanceResult = await alchemy.core.getBalance(address);
            const balanceInEth = Number(balanceResult) / 1e18; // Convert from Wei to ETH

            // TODO: Add price fetching logic for USD conversion
            // For now using a placeholder conversion
            const balanceInUsd = balanceInEth * 3000; // Placeholder price

            const response: BalanceResponse = {
                address,
                balance: balanceInEth,
                balanceInUsd,
            };
            
            return response;
        } catch (error) {
            console.error("Alchemy API Error:", error.message);
            throw error;
        }
    };

    return { getBalance };
};
