import type { IAgentRuntime, Memory, State } from "@elizaos/core";
import {
    composeContext,
    generateObjectDeprecated,
    ModelClass,
} from "@elizaos/core";
import {
    createConfig,
    executeRoute,
    ExtendedChain,
    getRoutes,
} from "@lifi/sdk";
import { base, baseSepolia } from "viem/chains";

import { swapTemplate } from "../templates";
import type { SwapParams } from "../types";

export { swapTemplate };

export class SwapAction {
    constructor(private chain: "base" | "base-sepolia") {}

    async getCalldata(params: SwapParams): Promise<`0x${string}`> {
        const chainId = this.chain === "base" ? base.id : baseSepolia.id;

        const routes = await getRoutes({
            fromChainId: chainId,
            toChainId: chainId,
            fromTokenAddress: params.fromToken,
            toTokenAddress: params.toToken,
            fromAmount: params.amount,
            // Use a dummy address since we only need calldata
            fromAddress: "0x0000000000000000000000000000000000000000",
            options: {
                slippage: params.slippage || 0.5,
                order: "RECOMMENDED",
            },
        });

        if (!routes.routes.length) throw new Error("No routes found");

        const route = routes.routes[0];
        // Return just the calldata needed for the swap
        return route.steps[0].estimate.approvalAddress as `0x${string}`;
    }
}

export const swapAction = {
    name: "swap",
    description: "Get calldata for swapping tokens on Base or Base Sepolia",
    handler: async (
        runtime: IAgentRuntime,
        _message: Memory,
        state: State,
        _options: any,
        callback?: any
    ) => {
        console.log("Swap action handler called");

        // Compose swap context
        const swapContext = composeContext({
            state,
            template: swapTemplate,
        });
        const content = await generateObjectDeprecated({
            runtime,
            context: swapContext,
            modelClass: ModelClass.LARGE,
        });

        // Validate chain
        if (content.chain !== "base" && content.chain !== "base-sepolia") {
            throw new Error("Only Base and Base Sepolia chains are supported");
        }

        const action = new SwapAction(content.chain);

        const swapOptions: SwapParams = {
            chain: content.chain,
            fromToken: content.inputToken,
            toToken: content.outputToken,
            amount: content.amount,
            slippage: content.slippage,
        };

        try {
            const calldata = await action.getCalldata(swapOptions);
            if (callback) {
                callback({
                    text: `Generated swap calldata for ${swapOptions.amount} ${swapOptions.fromToken} to ${swapOptions.toToken} on ${content.chain}`,
                    content: {
                        success: true,
                        calldata,
                        chain: content.chain,
                    },
                });
            }
            return true;
        } catch (error) {
            console.error("Error in swap handler:", error.message);
            if (callback) {
                callback({ text: `Error: ${error.message}` });
            }
            return false;
        }
    },
    template: swapTemplate,
    validate: async () => true, // No private key validation needed
    examples: [
        [
            {
                user: "user",
                content: {
                    text: "Swap 1 ETH for USDC on Base",
                    action: "TOKEN_SWAP",
                },
            },
        ],
    ],
    similes: ["TOKEN_SWAP", "EXCHANGE_TOKENS", "TRADE_TOKENS"],
};
