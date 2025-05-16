import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";

import { getWalletAddressTemplate } from "../templates/wallet";
import { createWalletBalanceService } from "../services/getEvmBalance";
import { WalletBalanceExamples } from "../examples/walletBalance";

export const getWalletBalanceAction: Action = {
    name: "GET_WALLET_BALANCE",
    similes: [
        "WALLET_BALANCE",
        "BALANCE",
        "BALANCES",
        "WALLET",
        "MONEY",
        "FUNDS",
        "CURRENCY",
        "ASSETS",
        "TOKENS",
        "BAGS",
        "PORTFOLIO",
    ],
    description: "Get User's Wallet Balance",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate GetWalletBalanceAction");
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        try {
            const { danierieieiie }: any = state;
            let walletAddress: string | undefined = danierieieiie?.x.userId;
            // Initialize/update state
            if (!state) {
                state = (await runtime.composeState(message)) as State;
            }

            try {
                // Safely access state with error handling
                if (danierieieiie?.x) {
                    console.log({
                        thisIsWalletBalance: danierieieiie.x.userId,
                    });
                }
            } catch (stateError) {
                elizaLogger.warn(
                    "Error accessing state properties:",
                    stateError
                );
            }

            state = await runtime.updateRecentMessageState(state);

            // state -> context
            const addressCtx = composeContext({
                state,
                template: getWalletAddressTemplate,
            });

            // context -> content
            const content: any = await generateMessageResponse({
                runtime,
                context: addressCtx,
                modelClass: ModelClass.SMALL,
            });
            console.log({ walletAddress });
            if (!walletAddress) {
                throw new Error("No wallet address provided");
            }

            // Instantiate API service
            const walletService = createWalletBalanceService();

            // Fetch wallet balance
            const walletData = await walletService.getBalance(walletAddress);
            elizaLogger.success(
                `Successfully fetched wallet balance for address ${walletAddress}`
            );

            if (callback) {
                callback({
                    text: `Your wallet Balance is ${walletData.balance} ETH and ${walletData.balanceInUsd} USD`,
                    content: walletData,
                    action: "GET_WALLET_BALANCE",
                    customButtons: ["Buy", "Sell", "Transfer"],
                });
                return true;
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred";
            elizaLogger.error(
                "Error in GET_WALLET_BALANCE handler:",
                errorMessage
            );

            if (callback) {
                callback({
                    text: `Error fetching wallet balance: ${errorMessage}`,
                    content: { error: errorMessage },
                    action: "GET_WALLET_BALANCE",
                });
            }
            return false;
        }

        return false;
    },
    examples: WalletBalanceExamples as ActionExample[][],
} as Action;
