import { ethers, Wallet } from "ethers";
// Imports the Alchemy SDK
import { Alchemy, Network, TransactionResponse } from "alchemy-sdk";
import { alchemyApiKey } from "../const";
import { elizaLogger } from "@elizaos/core";

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
            throw new Error("Transaction hash is required");
        }

        if (!alchemyApiKey) {
            throw new Error("Alchemy API key is not configured");
        }

        try {
            const response = await alchemy.transact.getTransaction(
                transactionHash
            );

            if (!response) {
                throw new Error(`Transaction ${transactionHash} not found`);
            }

            elizaLogger.success(
                `Successfully validated transaction ${transactionHash}`
            );
            return response;
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred";
            elizaLogger.error("Error validating transaction:", {
                transactionHash,
                error: errorMessage,
            });

            // Rethrow with more context
            throw new Error(`Failed to validate transaction: ${errorMessage}`);
        }
    };

    return { validateTransaction };
};
