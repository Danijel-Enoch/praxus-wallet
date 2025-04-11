import { ethers, Wallet } from "ethers";
import { Alchemy, Network, GetTokensForOwnerResponse } from "alchemy-sdk";

// Configures the Alchemy SDK
const config = {
    apiKey: "mQdX_ajGy6vAoSUSAnxdBH9eRbScCseK", // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
};

const alchemy = new Alchemy(config);

export const CreategetWalletPortfolioService = () => {
    const getPortfolio = async (
        chain: string,
        address: string
    ): Promise<GetTokensForOwnerResponse> => {
        if (!chain) {
            throw new Error("Invalid create Wallet parameters");
        }

        try {
            // Simulate a response for demonstration purposes
            let response = await alchemy.core.getTokensForOwner(address);
            //convert mnemonic to PubKey
            return response;
        } catch (error) {
            console.error(
                "Getting Wallet Portfolio Error OCCURED:",
                error.message
            );
            throw error;
        }
    };

    return { getPortfolio };
};
