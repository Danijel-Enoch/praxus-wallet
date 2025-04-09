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
        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        // state -> context
        const addressCtx = composeContext({
            state,
            template: getWalletAddressTemplate,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: addressCtx,
            modelClass: ModelClass.SMALL,
        });

        // parse content
        const address = content?.address && !content?.error;

        if (!address) {
            return;
        }

        // Instantiate API service
        // const config = await validateOpenWeatherConfig(runtime);
        const walletService = createWalletBalanceService();

        // Fetch weather & respond
        try {
            const walletData = await walletService.getBalance(
                String(content?.address || "")
            );
            elizaLogger.success(
                `Successfully fetched weather for ${content.city}, ${content.country}`
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
            elizaLogger.error("Error in GET_CURRENT_WEATHER handler:", error);

            callback({
                text: `Error fetching weather: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: WalletBalanceExamples as ActionExample[][],
} as Action;
