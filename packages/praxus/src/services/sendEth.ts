import { ethers, Wallet } from "ethers";
// Imports the Alchemy SDK
import { Alchemy, Network, TransactionResponse } from "alchemy-sdk";
import { alchemyApiKey } from "../const";

// Function to create ETH send calldata
function createSendETHCalldata(to, amount) {
    // For ETH transfer, we don't need function signature as it's a native transfer
    // Create a transaction object
    const tx = {
        to: to, // Recipient address
        value: ethers.parseEther(amount.toString()), // Amount in ETH
    };

    // For raw calldata, ETH transfer is just a transaction without data
    // We'll return the transaction parameters instead of encoded data
    return {
        to: tx.to,
        value: tx.value.toString(),
        data: "0x", // Empty data for plain ETH transfer
    };
}

export const createSendEthService = () => {
    const createCallData = async (
        address: string,
        amount: string
    ): Promise<{ to: any; value: string; data: string }> => {
        if (!address || !amount) {
            throw new Error("Invalid parameters");
        }

        try {
            const response = createSendETHCalldata(address, amount);
            return response;
        } catch (error) {
            console.error("Creating Wallet Error OCCURED:", error.message);
            throw error;
        }
    };

    return { createCallData };
};
