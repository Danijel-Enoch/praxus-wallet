type BalanceResponse = {
    address: string;
    balance: number;
    balanceInUsd: number;
};
export const createWalletBalanceService = () => {
    const getBalance = async (address: string): Promise<BalanceResponse> => {
        if (!address) {
            throw new Error("Invalid parameters");
        }

        try {
            // Simulate a response for demonstration purposes
            const response: BalanceResponse = {
                address,
                balance: 1000,
                balanceInUsd: 2000,
            };
            return response;
        } catch (error) {
            console.error("Weather API Error:", error.message);
            throw error;
        }
    };

    return { getBalance };
};
