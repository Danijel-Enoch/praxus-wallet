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

import { sendERC20Template, sendETHTemplate } from "../templates/wallet";
import { createSendEthService } from "../services/sendEth";
import { SendEthExamples } from "../examples/send";

export const sendEthAction: Action = {
    name: "SEND_TOKEN",
    similes: ["SEND_TOKEN", "SEND_ERC20", "SEND_COIN", "SEND_ERC20_TOKEN"],
    description: "Send ERC20 tokens",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate send ERC20 action");
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
        console.log(" starting to compose context");
        const sendErc20Ctx = composeContext({
            state,
            template: sendERC20Template,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: sendErc20Ctx,
            modelClass: ModelClass.SMALL,
        });

        // console.log("Transaction Hash Content:", content);
        // parse content
        const amount = content?.amount && !content?.error;

        if (!amount) {
            elizaLogger.error("Error in SEND_ETH handler: No amount found");
            return;
        }

        const address = content?.address && !content?.error;
        if (!address) {
            elizaLogger.error("Error in SEND_ETH handler: No address found");
            return;
        }

        const token = content?.token && !content?.error;
        if (!token) {
            elizaLogger.error("Error in SEND_ETH handler: No token found");
            return;
        }

        // Instantiate API service
        // const config = await validateOpenWeatherConfig(runtime);
        const sendEthSerivce = createSendEthService();

        // Fetch weather & respond
        try {
            const sendEthData = await sendEthSerivce.createCallData(
                String(content?.address || ""),
                String(content?.amount || "")
            );
            elizaLogger.success(
                `Successfully create call data for ${content.amount} ETH to ${content.address}`
            );

            if (callback) {
                callback({
                    text: `Successfully created call data for ${content.amount} ETH to ${content.address}\nClick on the send button to send/sign Transaction`,
                    content: sendEthData,
                    action: "SEND_ETH",
                    callData: sendEthData,
                    customButtons: ["Send", "Sign", "Transfer"],
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in SEND_ETH handler:", error);

            callback({
                text: `Error fetching news: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: SendEthExamples as ActionExample[][],
} as Action;
