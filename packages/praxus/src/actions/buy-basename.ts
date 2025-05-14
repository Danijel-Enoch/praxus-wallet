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
import { buyBasenameTemplate } from "../templates/basename";
import { BuyBasenameExamples } from "../examples/basename";
import { createBasenameService } from "../services/basename";

export const BuyBasenameAction: Action = {
    name: "BUY_BASENAME",
    similes: [
        "BUY_BASENAME",
        "PURCHASE_BASENAME",
        "GET_BASENAME",
        "REGISTER_BASENAME",
    ],
    description: "Purchase a basename with username and address",
    validate: async (runtime: IAgentRuntime) => {
        console.log("validate BuyBasenameAction");
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

        // Compose context using template
        const basenameCtx = composeContext({
            state,
            template: buyBasenameTemplate,
        });

        // Generate response using the context
        const content = await generateMessageResponse({
            runtime,
            context: basenameCtx,
            modelClass: ModelClass.SMALL,
        });

        // Extract username and address
        const username = content?.username || state.username;
        const address = content?.address || state.address;

        if (!username || !address) {
            callback({
                text: "Please provide both a username and address to purchase a basename",
                content: { error: "Missing required fields" },
            });
            return false;
        }

        try {
            // Instantiate and use basename service
            const basename = createBasenameService();
            const purchaseResult = await basename.registerDomain(
                username as string,
                address as string
            );

            elizaLogger.success(
                `Successfully initiated basename purchase for ${username}`
            );

            const text = `Initiating basename purchase for ${username} with address ${address}. Please wait for confirmation.\nTransaction Hash: https://basescan.com/tx/${purchaseResult.transactionHash}`;
            callback({
                text,
                content: purchaseResult,
                action: "BUY_BASENAME",
                customButtons: ["Check Status", "View Details"],
                data: {
                    hash: purchaseResult.transactionHash,
                    username: username,
                    address: address,
                },
            });
            return true;
        } catch (error) {
            elizaLogger.error("Error in BUY_BASENAME handler:", error);

            callback({
                text: `Error purchasing basename: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }
    },
    examples: BuyBasenameExamples as ActionExample[][],
} as Action;
