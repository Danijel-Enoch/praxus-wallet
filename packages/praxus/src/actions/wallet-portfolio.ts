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

import { walletPortfolioTemplate } from "../templates/wallet";
import { CreategetWalletPortfolioService } from "../services/getWalletPortfolio";
import { GetWalletPortfolioExamples } from "../examples/walletBalance";

export const getWalletPortfolioAction: Action = {
    name: "GET_WALLET_PORTFOLIO",
    similes: [
        "WALLET_PORTFOLIO",
        "GET_WALLET_PORTFOLIO",
        "GET_PORTFOLIO",
        "GET_PORTFOLIO_BALANCE",
        "GET_WALLET_BALANCE",
        "GET_BALANCE",
        "GET_BALANCE_PORTFOLIO",
        "GET_WALLET_PORTFOLIO_BALANCE",
        "GET_WALLET_PORTFOLIO_BALANCE",
        "GET_WALLET_PORTFOLIO_BALANCE",
        "GET_MY_PORTFOLIO",
        "GET_MY_WALLET_PORTFOLIO",
        "GET_MY_WALLET_PORTFOLIO_BALANCE",
        "PNL",
        "PORTFOLIO",
        "ALL_TOKENS_IN_PORTFOLIO",
        "ALL_TOKENS_IN_WALLET",
    ],
    description: "Get wallet portfolio",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate getWalletPortfolioAction");
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
        const { danierieieiie }: any = state;
        let walletAddress: string | undefined = danierieieiie?.x.userId;

        // state -> context
        const newWalletCtx = composeContext({
            state,
            template: walletPortfolioTemplate,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: newWalletCtx,
            modelClass: ModelClass.SMALL,
        });

        // parse content
        const chain = content?.chain && !content?.error;

        console.log({ walletAddress });
        if (!walletAddress) {
            throw new Error("No wallet address provided");
        }
        if (!chain) {
            throw new Error("No chain provided");
        }

        // Instantiate API service
        // const config = await validateOpenWeatherConfig(runtime);
        const walletService = CreategetWalletPortfolioService();

        // Fetch weather & respond
        try {
            const walletPorfolio = await walletService.getPortfolio(
                String(content?.chain || ""),
                String(content?.address || "")
            );
            elizaLogger.success(
                `Successfully fetched Wallet Portfolio for ${content.chain}, ${content.address}`
            );
            let porfolioContent = `This is your wallet portfolio: \n`;
            porfolioContent += `Wallet Address: ${content.address} \n`;

            if (!walletPorfolio.tokens || walletPorfolio.tokens.length === 0) {
                porfolioContent += `No tokens found in the wallet.`;
            } else {
                porfolioContent += `Tokens: \n`;
                for (let i = 0; i < walletPorfolio.tokens.length; i++) {
                    porfolioContent += `${walletPorfolio.tokens[i].name}: ${walletPorfolio.tokens[i].balance} \n`;
                }
            }

            if (callback) {
                callback({
                    text: porfolioContent,
                    content: walletPorfolio,
                    action: "GET_WALLET_PORTFOLIO",
                    customButtons: ["Buy", "Sell", "Transfer"],
                });
                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_WALLET_PORTFOLIO handler:", error);

            callback({
                text: `Error fetching Wallet Portfolio: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: GetWalletPortfolioExamples as ActionExample[][],
} as Action;
