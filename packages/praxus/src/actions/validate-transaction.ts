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

import { getTransactionHashTemplate } from "../templates";
import { createValidateTransactionService } from "../services/validateTransaction";
import { TransactionHashValidationExamples } from "../examples/validate";

export const validateTranasctionHashAction: Action = {
    name: "CONFIRM_TRANSACTION_HASH",
    similes: [
        "CONFIRM_TRANSACTION_HASH",
        "CONFIRM_TRANSACTION",
        "CONFIRM_TRANSACTION_HASH",
        "CONFIRM_TRANSACTION_HASH",
        "TRANSACTION_HASH",
        "TRANSACTION",
        "TRANSACTION_HASH",
        "TRANSACTION_HASH",
    ],
    description: "Confirms a transaction hash",
    validate: async (runtime: IAgentRuntime) => {
        console.log("confirm transaction hash action");
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

        console.log("Transaction Hash Content:", content);
        // parse content
        const transactionHash = content?.transactionHash && !content?.error;

        if (!transactionHash) {
            elizaLogger.error(
                "Error in GET_NEWS_UPDATES handler: No transaction hash found"
            );
            return;
        }

        // Instantiate API service
        // const config = await validateOpenWeatherConfig(runtime);
        const transactionHashService = createValidateTransactionService();

        // Fetch weather & respond
        try {
            const transactionStatus =
                await transactionHashService.validateTransaction(
                    String(content?.transactionHash || "")
                );
            elizaLogger.success(
                `Successfully Fetched Latest News Updates for ${content.transactionHash}`
            );

            if (callback) {
                callback({
                    text: `Transaction Status: \n Block Number: ${transactionStatus.blockNumber} \n Confirmations: ${transactionStatus.confirmations} \n From: ${transactionStatus.from} \n To: ${transactionStatus.to} \n Value: ${transactionStatus.value} \n Gas Price: ${transactionStatus.gasPrice} \n Hash: ${transactionStatus.hash}`,
                    content: transactionStatus,
                    action: "CONFIRM_TRANSACTION_HASH",
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error(
                "Error in CONFIRM_TRANSACTION_HASH handler:",
                error
            );

            callback({
                text: `Error fetching news: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: TransactionHashValidationExamples as ActionExample[][],
} as Action;
