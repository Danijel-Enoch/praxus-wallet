import { ethers, isAddress, Wallet } from "ethers";
// Imports the Alchemy SDK
import { Alchemy, Network, TransactionResponse } from "alchemy-sdk";
import { alchemyApiKey } from "../const";

// Configures the Alchemy SDK
const config = {
    apiKey: alchemyApiKey, // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
};

const alchemy = new Alchemy(config);

// Function to convert ERC20 token transfer to calldata
function createERC20TransferCalldata(to, amount, tokenAddress, decimals = 18) {
    // ERC20 transfer function signature
    const transferFunctionSignature = "transfer(address,uint256)";

    // Create interface for ERC20 transfer function
    const iface = new ethers.Interface([
        `function ${transferFunctionSignature}`,
    ]);

    // Format amount to correct decimal places
    const formattedAmount = ethers.parseUnits(amount.toString(), decimals);

    // Encode the function call to calldata
    const calldata = iface.encodeFunctionData("transfer", [
        to, // Recipient address
        formattedAmount, // Amount to transfer
    ]);

    return calldata;
}

export const createSendEthService = () => {
    const createCallData = async (
        address: string,
        amount: string,
        token: string,
        sender: string
    ): Promise<{ to: any; data: string }> => {
        if (!address || !amount || !token) {
            throw new Error("Invalid parameters");
        }
        let tokenAddress;
        let decimals = 0;
        if (isAddress(token)) {
            tokenAddress = token;
            // get decimals
        } else {
            let response = await alchemy.core.getTokensForOwner(sender);
            // look for symbol in portfolio list and if found fetch address and decimals or else throw error that use does not have any tokens with that symbol
        }
        // check that token is symbol or address
        // if symbol, get user portfolio and get token address and decimals
        // if address, get decimals

        try {
            const response = createERC20TransferCalldata(
                address,
                amount,
                token,
                decimals
            );
            return { to: tokenAddress, data: response };
        } catch (error) {
            console.error("Creating Wallet Error OCCURED:", error.message);
            throw error;
        }
    };

    return { createCallData };
};
