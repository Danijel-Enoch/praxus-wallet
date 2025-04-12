import { ethers, Wallet } from "ethers";
// Imports the Alchemy SDK
import { Alchemy, Network, TransactionResponse } from "alchemy-sdk";
import { alchemyApiKey } from "../const";

// Configures the Alchemy SDK
const config = {
    apiKey: alchemyApiKey, // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

export const createValidateTransactionService = () => {
    const validateTransaction = async (
        transactionHash: string
    ): Promise<TransactionResponse> => {
        if (!transactionHash) {
            throw new Error("Invalid transaction hash");
        }

        try {
            const response = await alchemy.transact.getTransaction(
                transactionHash
            );
            return response;
        } catch (error) {
            console.error("Creating Wallet Error OCCURED:", error.message);
            throw error;
        }
    };

    return { validateTransaction };
};
