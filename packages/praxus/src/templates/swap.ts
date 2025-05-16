export const swapTemplate = `
Task: Extract token swap information from the conversation.

Recent conversation:
{{recentMessages}}

Instructions: Based on the conversation, extract:
1. The source chain (must be either 'base' or 'base-sepolia')
2. Input token address
3. Output token address
4. Amount to swap
5. Optional: slippage tolerance (default 0.5%)

Response format should be in JSON:
{
    "chain": "base or base-sepolia",
    "inputToken": "token address",
    "outputToken": "token address",
    "amount": "amount as string",
    "slippage": optional number
}`;
