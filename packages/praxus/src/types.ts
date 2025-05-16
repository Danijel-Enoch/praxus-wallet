export interface SwapParams {
    chain: "base" | "base-sepolia";
    fromToken: string;
    toToken: string;
    amount: string;
    slippage?: number;
}
