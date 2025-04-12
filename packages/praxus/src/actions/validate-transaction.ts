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

import { getNewsSiteTemplate } from "../templates/news";
import { createGetLatestNewsUpdatesService } from "../services/getLastestNewsUpdates";
import { NewsUpdateExamples } from "../examples/news";
import { getTransactionHashTemplate } from "../templates";
import { createValidateTransactionService } from "../services/validateTransaction";

export const validateTranasctionHashAction: Action = {
    name: "VALIDATE_TRANSACTION_HASH",
    similes: [
        "VALIDATE_TRANSACTION_HASH",
        "VALIDATE_TRANSACTION",
        "VALIDATE_TRANSACTION_HASH",
        "VALIDATE_TRANSACTION_HASH",
        "TRANSACTION_HASH",
        "TRANSACTION",
        "TRANSACTION_HASH",
        "TRANSACTION_HASH",
    ],
    description: "Validates a transaction hash",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate transaction hash action");
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
        const transactionHashCtx = composeContext({
            state,
            template: getTransactionHashTemplate,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: transactionHashCtx,
            modelClass: ModelClass.SMALL,
        });

        // parse content
        const transactionHash = content?.transactionHash && !content?.error;

        if (!transactionHash) {
            return;
        }

        // Instantiate API service
        // const config = await validateOpenWeatherConfig(runtime);
        const transactionHashService = createValidateTransactionService();

        // Fetch weather & respond
        try {
            const transactionStatus =
                await transactionHashService.validateTransaction(
                    String(content?.site || "")
                );
            elizaLogger.success(
                `Successfully Fetched Latest News Updates for ${content.site}`
            );

            if (callback) {
                callback({
                    text: `Transaction Status: \n Block Number: ${transactionStatus.blockNumber} \n Confirmations: ${transactionStatus.confirmations} \n From: ${transactionStatus.from} \n To: ${transactionStatus.to} \n Value: ${transactionStatus.value} \n Gas Price: ${transactionStatus.gasPrice} \n Hash: ${transactionStatus.hash}`,
                    content: transactionStatus,
                    action: "GET_NEWS_UPDATES",
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_NEWS_UPDATES handler:", error);

            callback({
                text: `Error fetching news: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: NewsUpdateExamples as ActionExample[][],
} as Action;
