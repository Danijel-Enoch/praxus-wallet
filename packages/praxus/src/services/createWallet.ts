import { ethers, Wallet } from "ethers";
type newWalletResponse = {
    publicKey: string;
    privateKey: string;
    mnemonic: string;
};
async function getWalletAddress(privateKey: string | ethers.SigningKey) {
    const PubKey = new ethers.Wallet(privateKey).address;
    return PubKey;
}
export const createNewWalletService = () => {
    const createWallet = async (chain: string): Promise<newWalletResponse> => {
        if (!chain) {
            throw new Error("Invalid create Wallet parameters");
        }

        try {
            // Simulate a response for demonstration purposes
            const mnemonic: string =
                ethers.Wallet.createRandom().mnemonic?.phrase!;
            //convert mnemonic to PrivateKey
            const privateKey = Wallet.fromPhrase(mnemonic).privateKey;
            //convert mnemonic to PubKey

            return {
                privateKey: privateKey,
                mnemonic: mnemonic,
                publicKey: await getWalletAddress(privateKey),
            };
        } catch (error) {
            console.error("Creating Wallet Error OCCURED:", error.message);
            throw error;
        }
    };

    return { createWallet };
};
